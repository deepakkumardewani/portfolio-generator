export interface Bio {
  name: string;
  tagline: string;
  about: string;
  profileImg?: string;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  technologies?: string[];
  githubUrl?: string;
}

export interface PortfolioData {
  bio: Bio;
  projects: Project[];
  skills: Skill[];
  workExperience: WorkExperience[];
  contact: Contact;
  theme: Theme;
  selectedTemplate: TemplateType;
  templateSections?: TemplateSectionConfig;
}

export interface Skill {
  value: string;
  label: string;
  image: string;
  category: string;
}

export interface WorkExperience {
  company: string;
  jobTitle: string;
  skills: string[];
  fromDate: string;
  toDate: string;
  description: string;
}

export interface Contact {
  phone: string;
  email: string;
  links: ContactLink[];
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface PortfolioState {
  bio: Bio;
  skills: Skill[];
  workExperience: WorkExperience[];
  projects: Project[];
  contact: Contact;
  theme: Theme;
  selectedTemplate: TemplateType;
  viewMode: "desktop" | "mobile";
  templateSections: TemplateSectionConfig;
  _sync?: {
    lastSyncedAt: number;
    isDirty: boolean;
  };
}

export interface SkillsFormValues {
  skills: Skill[];
}
export interface BioFormValues {
  name: string;
  tagline: string;
  about: string;
  profileImg?: string;
}

export interface WorkExperienceFormValues {
  workExperience: WorkExperience[];
}

export interface ProjectsFormValues {
  projects: Project[];
}

export interface ContactFormValues {
  phone: string;
  email: string;
  links: ContactLink[];
}
export interface Theme {
  primaryColor: string;
  layout: "single" | "grid";
}

export type TemplateType = "Minimalist" | "Creative" | "Modern";

export interface TemplateSectionConfig {
  sections: TemplateSection[];
}

export interface TemplateSection {
  id: string;
  title: string;
  visible: boolean;
  isFixed: boolean; // Header, Hero, Footer are fixed
}
