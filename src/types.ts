export interface PortfolioState {
  bio: Bio;
  skills: Skill[];
  workExperience: WorkExperience[];
  projects: Project[];
  contact: Contact;
  theme: Theme;
  selectedTemplate: TemplateType;
  viewMode: "desktop" | "mobile" | "tablet";
  templateSections: TemplateSections;
  _sync?: {
    lastSyncedAt: number;
    isDirty: boolean;
  };
}
