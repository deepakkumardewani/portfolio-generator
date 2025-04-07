import {
  configureStore,
  createSlice,
  PayloadAction,
  Middleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appwriteMiddleware } from "./lib/appwriteMiddleware";
import * as appwriteService from "./lib/appwriteService";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
} from "./types";

const iconBaseUrl = "https://skillicons.dev/icons?i=";

// Development data with detailed lorem ipsum
const devData: PortfolioState = {
  bio: {
    name: "John Doe",
    tagline: "Full Stack Developer & UI/UX Enthusiast",
    about:
      "As a seasoned full-stack developer with over 8 years of experience, I specialize in crafting robust and scalable web applications.",
  },
  skills: [
    {
      value: "JavaScript",
      label: "JavaScript",
      image: `${iconBaseUrl}js`,
      category: "frontend",
    },
    {
      value: "React",
      label: "React",
      image: `${iconBaseUrl}react`,
      category: "frontend",
    },
    {
      value: "Node.js",
      label: "Node.js",
      image: `${iconBaseUrl}nodejs`,
      category: "backend",
    },
    {
      value: "TypeScript",
      label: "TypeScript",
      image: `${iconBaseUrl}ts`,
      category: "frontend",
    },
    {
      value: "Next.js",
      label: "Next.js",
      image: `${iconBaseUrl}nextjs`,
      category: "frontend",
    },
    {
      value: "Tailwind CSS",
      label: "Tailwind CSS",
      image: `${iconBaseUrl}tailwind`,
      category: "frontend",
    },
    {
      value: "CSS",
      label: "CSS",
      image: `${iconBaseUrl}css`,
      category: "frontend",
    },
    {
      value: "HTML",
      label: "HTML",
      image: `${iconBaseUrl}html`,
      category: "frontend",
    },
    {
      value: "Laravel",
      label: "Laravel",
      image: `${iconBaseUrl}laravel`,
      category: "backend",
    },
    {
      value: "Ruby",
      label: "Ruby",
      image: `${iconBaseUrl}ruby`,
      category: "backend",
    },
    {
      value: "Ruby on Rails",
      label: "Ruby on Rails",
      image: `${iconBaseUrl}rails`,
      category: "backend",
    },
    {
      value: "AWS",
      label: "AWS",
      image: `${iconBaseUrl}aws`,
      category: "tool",
    },
    {
      value: "Azure",
      label: "Azure",
      image: `${iconBaseUrl}azure`,
      category: "tool",
    },
    {
      value: "Google Cloud",
      label: "Google Cloud",
      image: `${iconBaseUrl}gcp`,
      category: "tool",
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
        "Led a team of 5 developers in redesigning and implementing the company's flagship SaaS platform, resulting in a 40% improvement in user engagement metrics. Architected and implemented a new state management system using Redux Toolkit and TypeScript, reducing bug reports by 60%. Established coding standards and review processes that improved team productivity by 25%. Mentored junior developers and conducted weekly knowledge sharing sessions on best practices in modern web development. Optimized application performance through code splitting and lazy loading, achieving a 30% reduction in initial load time.",
    },
    {
      company: "Digital Innovations",
      jobTitle: "Frontend Developer",
      skills: ["JavaScript", "Vue.js", "CSS"],
      fromDate: "2020-01-01",
      toDate: "2024-01-01",
      description:
        "Spearheaded the development of responsive web applications for Fortune 500 clients, ensuring cross-browser compatibility and optimal performance. Implemented advanced CSS animations and transitions that enhanced user experience and increased client satisfaction scores by 45%. Collaborated with UX designers to create and maintain a comprehensive component library, reducing development time for new features by 35%. Integrated third-party APIs and services, including payment gateways and social media platforms, expanding platform functionality.",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform Revolution",
      description:
        "Engineered a cutting-edge e-commerce platform utilizing microservices architecture and React.js. Implemented features including real-time inventory management, AI-powered product recommendations, and seamless payment processing integration. The platform handles over 10,000 daily active users and processes 1,000+ transactions daily. Key achievements include a 99.9% uptime, 2-second average page load time, and a 25% increase in conversion rates through optimized user flows and performance improvements.",
      imageUrl: "https://placehold.co/600x400",
      link: "https://github.com/johndoe/ecommerce",
      githubUrl: "https://github.com/johndoe/ecommerce",
    },
    {
      title: "Enterprise Task Management System",
      description:
        "Developed a comprehensive task management solution for enterprise teams using Next.js and GraphQL. The system features real-time collaboration tools, automated workflow management, and detailed analytics dashboards. Integrated with popular project management tools through custom APIs, enabling seamless data synchronization. The platform currently serves 50+ enterprise clients, managing over 100,000 tasks monthly with advanced features like resource allocation, time tracking, and predictive task completion estimates.",
      imageUrl: "https://placehold.co/600x400",
      link: "https://github.com/johndoe/taskmanager",
      githubUrl: "https://github.com/johndoe/taskmanager",
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
    primaryColor: "#3b82f6",
    layout: "single",
  },
  selectedTemplate: "Minimalist",
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

// Production data with empty fields
const prodData: PortfolioState = {
  bio: {
    name: "",
    tagline: "",
    about: "",
  },
  skills: [],
  workExperience: [],
  projects: [],
  contact: {
    phone: "",
    email: "",
    links: [],
  },
  theme: {
    primaryColor: "#3b82f6",
    layout: "single",
  },
  selectedTemplate: "Minimalist",
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

// Select initial state based on environment
const initialState = prodData;

// const initialState = prodData;

// Configure Redux Persist
const persistConfig = {
  key: "portfolio",
  storage,
};

// Add _sync field to initial state
const initialStateWithSync = {
  ...initialState,
  _sync: {
    lastSyncedAt: 0,
    isDirty: false,
  },
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialStateWithSync,
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
    setPortfolioData: (
      state,
      action: PayloadAction<Partial<PortfolioState>>
    ) => {
      const result = { ...state };

      // Only merge bio if it exists in payload
      if (action.payload.bio) {
        result.bio = {
          ...state.bio,
          ...action.payload.bio,
        };
      }

      // Only update arrays if they exist in payload
      if (action.payload.skills) {
        result.skills = action.payload.skills;
      }

      if (action.payload.workExperience) {
        result.workExperience = action.payload.workExperience;
      }

      if (action.payload.projects) {
        result.projects = action.payload.projects;
      }

      // Only merge contact if it exists in payload
      if (action.payload.contact) {
        result.contact = {
          ...state.contact,
          ...action.payload.contact,
        };
      }

      // Only merge theme if it exists in payload
      if (action.payload.theme) {
        result.theme = {
          ...state.theme,
          ...action.payload.theme,
        };
      }

      // Only update template if it exists in payload
      if (action.payload.selectedTemplate) {
        result.selectedTemplate = action.payload.selectedTemplate;
      }

      // Only update viewMode if it exists in payload
      if (action.payload.viewMode) {
        result.viewMode = action.payload.viewMode;
      }

      // Only merge templateSections if it exists in payload
      if (action.payload.templateSections) {
        result.templateSections = {
          ...state.templateSections,
          ...action.payload.templateSections,
        };
      }

      return result;
    },
    markAsSynced: (state) => {
      state._sync = {
        lastSyncedAt: Date.now(),
        isDirty: false,
      };
    },
    markAsDirty: (state) => {
      state._sync.isDirty = true;
    },
  },
});

// Define root reducer type
const rootReducer = combineReducers({
  portfolio: portfolioSlice.reducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;

// Create persisted reducer with proper typing
const persistedReducer = persistReducer<RootReducerState>(
  persistConfig,
  rootReducer
);

// Create store with middleware and persistence
const storeWithMiddleware = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(appwriteMiddleware as Middleware),
});

// Create persistor
export const persistor = persistStore(storeWithMiddleware);

// Export store instance
export const store = storeWithMiddleware;

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a type for the persisted state structure
export interface PersistState extends RootReducerState {
  _persist: { version: number; rehydrated: boolean };
}

// Export typed hooks with proper typing
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<PersistState> = useSelector;

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
  setPortfolioData,
  markAsSynced,
  markAsDirty,
} = portfolioSlice.actions;

/**
 * Initialize Appwrite database and load data
 * @param userId The user ID to load data for
 */
export const initializeAppwrite = async (userId: string): Promise<void> => {
  try {
    // Use the optimized version from appwriteService
    await appwriteService.initializeAppwrite(userId, store);
  } catch (error) {
    console.error("Error initializing Appwrite:", error);
  }
};
