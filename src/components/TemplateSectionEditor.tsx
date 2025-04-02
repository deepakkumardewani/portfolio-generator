"use client";
import React, { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useAppDispatch,
  useAppSelector,
  updateTemplateSections,
} from "@/store";
import { TemplateSection } from "@/types";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TemplateSectionEditorProps {
  onClose: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  SECTION: "section",
};

const DraggableSection = ({
  section,
  index,
  moveSection,
  toggleSectionVisibility,
}: {
  section: TemplateSection;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  toggleSectionVisibility: (id: string) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SECTION,
    item: { type: ItemTypes.SECTION, id: section.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !section.isFixed,
  });

  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover: (item: DragItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = (node: HTMLDivElement | null) => {
    drag(drop(node));
  };

  return (
    <div
      ref={ref}
      className={`flex items-center p-3 rounded-md border ${
        !section.visible
          ? "bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-neutral-400"
          : "bg-white dark:bg-neutral-900"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={{ cursor: section.isFixed ? "default" : "move" }}
    >
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox
          checked={section.visible}
          disabled={section.isFixed}
          onCheckedChange={() => toggleSectionVisibility(section.id)}
        />
        <span className="flex-1">{section.title}</span>
        {section.visible ? (
          <Icons.eye className="h-4 w-4 text-gray-500" />
        ) : (
          <Icons.eyeOff className="h-4 w-4 text-gray-500" />
        )}
      </div>
      {!section.isFixed && (
        <div className="p-1 hover:bg-gray-100 rounded">
          <Icons.gripVertical className="h-5 w-5 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default function TemplateSectionEditor({
  onClose,
}: TemplateSectionEditorProps) {
  const dispatch = useAppDispatch();
  const { templateSections } = useAppSelector((state) => state.portfolio);
  const [sections, setSections] = useState<TemplateSection[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (templateSections?.sections) {
      setSections(JSON.parse(JSON.stringify(templateSections.sections)));
    }
  }, [templateSections]);

  const moveSection = useCallback((dragIndex: number, hoverIndex: number) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      const draggedSection = newSections[dragIndex];
      newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, draggedSection);
      return newSections;
    });
    setHasChanges(true);
  }, []);

  const toggleSectionVisibility = (sectionId: string) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, visible: !section.visible };
      }
      return section;
    });

    setSections(updatedSections);
    setHasChanges(true);
  };

  const saveChanges = () => {
    dispatch(updateTemplateSections(sections));
    setHasChanges(false);
    onClose();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <div className="p-4 border-b bg-neutral-50 dark:bg-neutral-950">
          <h3 className="text-lg font-medium">Edit Template Sections</h3>
        </div>

        <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto bg-neutral-50 dark:bg-neutral-950">
          {sections.map((section, index) => (
            <DraggableSection
              key={section.id}
              section={section}
              index={index}
              moveSection={moveSection}
              toggleSectionVisibility={toggleSectionVisibility}
            />
          ))}
        </div>

        <div className="p-4 border-t bg-neutral-50 dark:bg-neutral-950">
          <Button
            onClick={saveChanges}
            disabled={!hasChanges}
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Icons.save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}
