import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
  Bio,
  WorkExperience,
  Project,
  Contact,
  Theme,
  TemplateType,
  PortfolioState,
  Skill,
  TemplateSection,
  TemplateSectionConfig,
} from "./types";

const initialState: PortfolioState = {
  bio: {
    name: "John Doe",
    tagline: "Full Stack Developer",
    about:
      "I'm a passionate developer with experience in building web applications using modern technologies.",
  },
  skills: [
    {
      value: "JavaScript",
      label: "JavaScript",
      image: "https://skillicons.dev/icons?i=js",
      category: "frontend",
    },
    {
      value: "React",
      label: "React",
      image: "https://skillicons.dev/icons?i=react",
      category: "frontend",
    },
    {
      value: "Node.js",
      label: "Node.js",
      image: "https://skillicons.dev/icons?i=nodejs",
      category: "backend",
    },
    {
      value: "TypeScript",
      label: "TypeScript",
      image: "https://skillicons.dev/icons?i=ts",
      category: "frontend",
    },
  ],
  workExperience: [
    {
      company: "Tech Solutions Inc.",
      jobTitle: "Senior Frontend Developer",
      skills: ["React", "TypeScript", "Redux"],
      fromDate: "2020-01-01",
      toDate: "2024-01-01",
      description:
        "Developed and maintained modern web applications using React and TypeScript. Implemented state management with Redux and improved performance across the application.",
    },
    {
      company: "Digital Innovations",
      jobTitle: "Frontend Developer",
      skills: ["JavaScript", "Vue.js", "CSS"],
      fromDate: "2020-01-01",
      toDate: "2024-01-01",
      description:
        "Built responsive user interfaces and implemented new features for client websites. Collaborated with designers to ensure pixel-perfect implementations.",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product listings, cart functionality, and payment processing.",
      imageUrl: "https://placehold.co/600x400",
      link: "https://github.com/johndoe/ecommerce",
    },
    {
      title: "Task Management App",
      description:
        "A productivity application for managing tasks, projects, and deadlines with team collaboration features.",
      imageUrl: "https://placehold.co/600x400",
      link: "https://github.com/johndoe/taskmanager",
    },
  ],
  contact: {
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    links: [
      {
        label: "LinkedIn",
        url: "https://linkedin.com/in/johndoe",
      },
      {
        label: "GitHub",
        url: "https://github.com/johndoe",
      },
      {
        label: "Dribbble",
        url: "https://dribbble.com/johndoe",
      },
      {
        label: "Twitter",
        url: "https://twitter.com/johndoe",
      },
    ],
  },
  theme: {
    primaryColor: "#3b82f6", // Default blue color
    layout: "single",
  },
  selectedTemplate: "Basic",
  viewMode: "desktop",
  templateSections: {
    sections: [
      { id: "header", title: "Header", visible: true, isFixed: true },
      { id: "hero", title: "Hero", visible: true, isFixed: true },
      { id: "about", title: "About", visible: true, isFixed: false },
      { id: "experience", title: "Experience", visible: true, isFixed: false },
      { id: "projects", title: "Projects", visible: true, isFixed: false },
      { id: "skills", title: "Skills", visible: true, isFixed: false },
      { id: "contact", title: "Contact", visible: true, isFixed: false },
      { id: "footer", title: "Footer", visible: true, isFixed: true },
    ],
  },
};

// Create portfolio slice
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setBio: (state, action: PayloadAction<Bio>) => {
      state.bio = action.payload;
    },
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    setWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      state.workExperience = action.payload;
    },
    addProject: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setContact: (state, action: PayloadAction<Contact>) => {
      state.contact = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setTemplate: (state, action: PayloadAction<TemplateType>) => {
      state.selectedTemplate = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"desktop" | "mobile">) => {
      state.viewMode = action.payload;
    },
    updateTemplateSection: (state, action: PayloadAction<TemplateSection>) => {
      const index = state.templateSections.sections.findIndex(
        (section) => section.id === action.payload.id
      );
      if (index !== -1) {
        state.templateSections.sections[index] = action.payload;
      }
    },
    updateTemplateSections: (
      state,
      action: PayloadAction<TemplateSection[]>
    ) => {
      state.templateSections.sections = action.payload;
    },
  },
});

// Export actions
export const {
  setBio,
  setSkills,
  setWorkExperience,
  addProject,
  setContact,
  setTheme,
  setTemplate,
  setViewMode,
  updateTemplateSection,
  updateTemplateSections,
} = portfolioSlice.actions;

// Create store
export const store = configureStore({
  reducer: {
    portfolio: portfolioSlice.reducer,
  },
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
