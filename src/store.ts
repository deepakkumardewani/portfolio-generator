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
  remainingRequests: 10,
  allowedRequestsPerDay: 10,
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
  remainingRequests: 10,
  allowedRequestsPerDay: 10,
};

// const initialState = process.env.NODE_ENV === "development" ? devData : prodData;
// Select initial state based on environment
const initialState = prodData;

// const initialState = prodData;

// Configure Redux Persist
const persistConfig = {
  key: "portfolio",
  storage,
  // Add blacklist or whitelist to control what gets persisted
  blacklist: ["_sync"], // Don't persist sync state
  // Add version and migration for proper data handling
  version: 1,
  migrate: (state: any) => {
    // Always return a promise
    return Promise.resolve(state);
  },
  // Add condition to determine when to rehydrate
  // This will skip rehydration if Appwrite has newer data
  shouldRehydrate: (state: any) => {
    // If we have data in Appwrite that's newer than our local storage,
    // we'll skip rehydration and use Appwrite data instead
    return true; // We'll control this through our initialization flow
  },
  stateReconciler: (inboundState: any, originalState: any): any => {
    // If we have data in Appwrite, prefer it over localStorage
    // This is a simple reconciliation function that merges states
    // but gives precedence to non-empty inbound values
    const mergedState = { ...originalState };

    // Helper to check if an object has actual data
    const hasData = (obj: any): boolean => {
      if (!obj) return false;
      // For objects with primitive properties, check if any property has content
      return Object.values(obj).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          val !== "" &&
          (typeof val !== "object" || hasData(val))
      );
    };

    // Only merge if we have inbound state
    if (inboundState) {
      // For each key in the inbound state
      Object.keys(inboundState).forEach((key) => {
        // Skip internal persist state
        if (key === "_persist") return;

        // For arrays and complex objects, check if data exists
        if (Array.isArray(inboundState[key])) {
          // If array has items, use it
          if (inboundState[key].length > 0) {
            mergedState[key] = inboundState[key];
          }
        } else if (typeof inboundState[key] === "object") {
          // For objects, prefer inbound if it has actual data
          if (hasData(inboundState[key])) {
            mergedState[key] = {
              ...originalState[key],
              ...inboundState[key],
            };
          }
        } else if (
          inboundState[key] !== null &&
          inboundState[key] !== undefined &&
          inboundState[key] !== ""
        ) {
          // For primitives, prefer non-empty inbound values
          mergedState[key] = inboundState[key];
        }
      });
    }

    return mergedState;
  },
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
      // Start with current state
      const result = { ...state };

      // Helper to check if incoming data has actual content
      const hasValidData = (data: any): boolean => {
        if (data === null || data === undefined) return false;

        // Arrays should not be empty
        if (Array.isArray(data)) return data.length > 0;

        // Objects should have at least one non-empty property
        if (typeof data === "object") {
          return Object.values(data).some(
            (val) =>
              val !== null &&
              val !== undefined &&
              val !== "" &&
              (typeof val !== "object" || hasValidData(val))
          );
        }

        // Primitives should not be empty strings
        return data !== "";
      };

      // Only merge bio if it exists in payload and has valid data
      if (action.payload.bio && hasValidData(action.payload.bio)) {
        result.bio = {
          ...state.bio,
          ...action.payload.bio,
        };
      }

      // Only update arrays if they exist in payload and have items
      if (action.payload.skills && action.payload.skills.length > 0) {
        result.skills = action.payload.skills;
      }

      if (
        action.payload.workExperience &&
        action.payload.workExperience.length > 0
      ) {
        result.workExperience = action.payload.workExperience;
      }

      if (action.payload.projects && action.payload.projects.length > 0) {
        result.projects = action.payload.projects;
      }

      // Only merge contact if it exists in payload and has valid data
      if (action.payload.contact && hasValidData(action.payload.contact)) {
        result.contact = {
          ...state.contact,
          ...action.payload.contact,
        };
      }

      // Only merge theme if it exists in payload and has valid data
      if (action.payload.theme && hasValidData(action.payload.theme)) {
        result.theme = {
          ...state.theme,
          ...action.payload.theme,
        };
      }

      // Only update template if it exists in payload and is not empty
      if (action.payload.selectedTemplate) {
        result.selectedTemplate = action.payload.selectedTemplate;
      }

      // Only update viewMode if it exists in payload
      if (action.payload.viewMode) {
        result.viewMode = action.payload.viewMode;
      }

      // Only merge templateSections if it exists in payload and has valid data
      if (
        action.payload.templateSections &&
        hasValidData(action.payload.templateSections)
      ) {
        result.templateSections = {
          ...state.templateSections,
          ...action.payload.templateSections,
        };
      }

      // Add handlers for request limit fields
      if (typeof action.payload.remainingRequests === "number") {
        result.remainingRequests = action.payload.remainingRequests;
      }

      if (typeof action.payload.allowedRequestsPerDay === "number") {
        result.allowedRequestsPerDay = action.payload.allowedRequestsPerDay;
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
    setRemainingRequests: (state, action: PayloadAction<number>) => {
      state.remainingRequests = action.payload;
    },
    setAllowedRequestsPerDay: (state, action: PayloadAction<number>) => {
      state.allowedRequestsPerDay = action.payload;
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
  setRemainingRequests,
  setAllowedRequestsPerDay,
} = portfolioSlice.actions;

/**
 * Initialize Appwrite database and load data
 * @param userId The user ID to load data for
 */
export const initializeAppwrite = async (userId: string): Promise<void> => {
  try {
    // Clear any stale persisted data first
    persistor.purge(); // This will clear the persist:portfolio from localStorage

    // Use the optimized version from appwriteService
    await appwriteService.initializeAppwrite(userId, store);

    // After loading Appwrite data, mark as synced
    store.dispatch(markAsSynced());
  } catch (error) {
    console.error("Error initializing Appwrite:", error);
  }
};
