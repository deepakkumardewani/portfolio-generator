import { Client, Databases, ID, Query } from "node-appwrite";
import type {
  Bio,
  Skill,
  WorkExperience,
  Project,
  Contact,
  PortfolioState,
} from "../types";
import { setPortfolioData, markAsSynced } from "@/store";
import { account } from "@/lib/appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY || "");

// Initialize Appwrite services
const databases = new Databases(client);

// Database and collections constants
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";

const COLLECTIONS = {
  USER: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
};

/**
 * Create a new user document when a user signs up
 */
export const createUserDocument = async (
  userId: string,
  name: string,
  email: string
) => {
  try {
    console.log(
      `[${new Date().toISOString()}] Checking for existing document for user: ${userId}`
    );

    // Check if user document already exists
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      console.log(
        `[${new Date().toISOString()}] User document already exists for ${userId}, documentId: ${
          existingDocs.documents[0].$id
        }`
      );
      return existingDocs.documents[0];
    }

    console.log(
      `[${new Date().toISOString()}] No existing document, creating new document for user: ${userId}`
    );
    // Create new user document
    const newUser = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      ID.unique(),
      {
        userId,
        name,
        email,
        bio: "",
        skills: "",
        workExperience: "",
        projects: "",
        contact: "",
        selectedTemplate: "",
      }
    );

    console.log(
      `[${new Date().toISOString()}] Created new user document: ${
        newUser.$id
      } for user: ${userId}`
    );
    return newUser;
  } catch (error) {
    // Handle specific error for duplicate documents
    // This helps in case two requests try to create a document simultaneously
    if (error instanceof Error && error.message.includes("duplicate")) {
      console.log(
        `[${new Date().toISOString()}] Duplicate document error - retrieving existing document for user: ${userId}`
      );

      // Retrieve the existing document instead
      const docs = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USER,
        [Query.equal("userId", userId)]
      );

      if (docs.total > 0) {
        console.log(
          `[${new Date().toISOString()}] Found existing document after duplicate error: ${
            docs.documents[0].$id
          }`
        );
        return docs.documents[0];
      }
    }

    console.error(
      `[${new Date().toISOString()}] Error creating user document:`,
      error
    );
    throw error;
  }
};

/**
 * Helper function to get or create a user document
 */
const getUserDocument = async (userId: string) => {
  try {
    console.log(
      `[${new Date().toISOString()}] getUserDocument called for user: ${userId}`
    );

    // Check if user document already exists
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      // Return existing document
      console.log(
        `[${new Date().toISOString()}] getUserDocument found existing document: ${
          existingDocs.documents[0].$id
        }`
      );
      return {
        exists: true,
        document: existingDocs.documents[0],
      };
    } else {
      // Use createUserDocument to create a new document
      // This ensures we use a single path for document creation
      console.log(
        `[${new Date().toISOString()}] No document found, calling createUserDocument...`
      );

      try {
        // Get user account info to pass to createUserDocument
        const userInfo = await account.get();

        // Call createUserDocument which already has duplicate checking logic
        const newDoc = await createUserDocument(
          userId,
          userInfo.name,
          userInfo.email
        );

        console.log(
          `[${new Date().toISOString()}] Document created via createUserDocument: ${
            newDoc.$id
          }`
        );

        return {
          exists: false,
          document: newDoc,
        };
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Error in getUserDocument while creating:`,
          error
        );

        // Final attempt to get document in case it was created by another process
        const finalCheckDocs = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.USER,
          [Query.equal("userId", userId)]
        );

        if (finalCheckDocs.total > 0) {
          console.log(
            `[${new Date().toISOString()}] Found document in final check: ${
              finalCheckDocs.documents[0].$id
            }`
          );
          return {
            exists: true,
            document: finalCheckDocs.documents[0],
          };
        }

        throw error;
      }
    }
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error in getUserDocument:`,
      error
    );
    throw error;
  }
};

/**
 * Save bio information to Appwrite
 */
export const saveBio = async (bio: Bio, userId: string) => {
  try {
    console.log("Saving bio to Appwrite");
    const { document } = await getUserDocument(userId);

    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      {
        bio: JSON.stringify(bio),
      }
    );
  } catch (error) {
    console.error("Error saving bio:", error);
    throw error;
  }
};

/**
 * Save skills to Appwrite
 */
export const saveSkills = async (skills: Skill[], userId: string) => {
  try {
    console.log("Saving skills to Appwrite");
    const { document } = await getUserDocument(userId);

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      {
        skills: JSON.stringify(skills),
      }
    );

    return true;
  } catch (error) {
    console.error("Error saving skills:", error);
    throw error;
  }
};

/**
 * Save work experience to Appwrite
 */
export const saveWorkExperience = async (
  workExperience: WorkExperience[],
  userId: string
) => {
  try {
    console.log("Saving work experience to Appwrite");
    const { document } = await getUserDocument(userId);

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      {
        workExperience: JSON.stringify(workExperience),
      }
    );

    return true;
  } catch (error) {
    console.error("Error saving work experience:", error);
    throw error;
  }
};

/**
 * Save projects to Appwrite
 */
export const saveProjects = async (projects: Project[], userId: string) => {
  try {
    console.log("Saving projects to Appwrite");
    const { document } = await getUserDocument(userId);

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      {
        projects: JSON.stringify(projects),
      }
    );

    return true;
  } catch (error) {
    console.error("Error saving projects:", error);
    throw error;
  }
};

/**
 * Save contact information to Appwrite
 */
export const saveContact = async (contact: Contact, userId: string) => {
  try {
    console.log("Saving contact to Appwrite");
    const { document } = await getUserDocument(userId);

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      {
        contact: JSON.stringify(contact),
      }
    );

    return true;
  } catch (error) {
    console.error("Error saving contact:", error);
    throw error;
  }
};

/**
 * Save template information to Appwrite
 */
export const saveTemplate = async (
  selectedTemplate: string,
  userId: string
) => {
  try {
    console.log("Saving template to Appwrite");
    const { document } = await getUserDocument(userId);

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      {
        selectedTemplate: JSON.stringify(selectedTemplate),
      }
    );

    return true;
  } catch (error) {
    console.error("Error saving template:", error);
    throw error;
  }
};

/**
 * Load bio from Appwrite
 */
export const loadBio = async (userId: string): Promise<Bio | null> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0) {
      return null;
    }

    const userDoc = response.documents[0];

    if (!userDoc.bio) {
      return null;
    }

    return JSON.parse(userDoc.bio);
  } catch (error) {
    console.error("Error loading bio:", error);
    return null;
  }
};

/**
 * Load skills from Appwrite
 */
export const loadSkills = async (userId: string): Promise<Skill[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0 || !response.documents[0].skills) {
      return [];
    }

    return JSON.parse(response.documents[0].skills);
  } catch (error) {
    console.error("Error loading skills:", error);
    return [];
  }
};

/**
 * Load work experience from Appwrite
 */
export const loadWorkExperience = async (
  userId: string
): Promise<WorkExperience[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0 || !response.documents[0].workExperience) {
      return [];
    }

    return JSON.parse(response.documents[0].workExperience);
  } catch (error) {
    console.error("Error loading work experience:", error);
    return [];
  }
};

/**
 * Load projects from Appwrite
 */
export const loadProjects = async (userId: string): Promise<Project[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0 || !response.documents[0].projects) {
      return [];
    }

    return JSON.parse(response.documents[0].projects);
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
};

/**
 * Load contact from Appwrite
 */
export const loadContact = async (userId: string): Promise<Contact | null> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0 || !response.documents[0].contact) {
      return null;
    }

    return JSON.parse(response.documents[0].contact);
  } catch (error) {
    console.error("Error loading contact:", error);
    return null;
  }
};

/**
 * Load template from Appwrite
 */
export const loadTemplate = async (
  userId: string
): Promise<{
  selectedTemplate: string;
} | null> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0 || !response.documents[0].selectedTemplate) {
      return null;
    }

    const template = JSON.parse(response.documents[0].selectedTemplate);
    return {
      selectedTemplate: template,
    };
  } catch (error) {
    console.error("Error loading template:", error);
    return null;
  }
};

/**
 * Load all portfolio data from Appwrite
 */
export const loadPortfolio = async (
  userId: string
): Promise<Partial<PortfolioState>> => {
  console.log("Loading portfolio for user:", userId);
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0) {
      return {};
    }

    const userDoc = response.documents[0];
    const portfolioData: Partial<PortfolioState> = {};

    // Parse each field if it exists
    if (userDoc.bio) {
      portfolioData.bio = JSON.parse(userDoc.bio);
    }

    if (userDoc.skills) {
      portfolioData.skills = JSON.parse(userDoc.skills);
    }

    if (userDoc.workExperience) {
      portfolioData.workExperience = JSON.parse(userDoc.workExperience);
    }

    if (userDoc.projects) {
      portfolioData.projects = JSON.parse(userDoc.projects);
    }

    if (userDoc.contact) {
      portfolioData.contact = JSON.parse(userDoc.contact);
    }

    if (userDoc.selectedTemplate) {
      portfolioData.selectedTemplate = JSON.parse(userDoc.selectedTemplate);
    }

    return portfolioData;
  } catch (error) {
    console.error("Error loading portfolio:", error);
    return {};
  }
};

/**
 * Save all portfolio data to Appwrite
 */
export const savePortfolio = async (
  portfolio: PortfolioState,
  userId: string,
  updatedSection?: string
): Promise<boolean> => {
  try {
    const { document } = await getUserDocument(userId);

    // If no specific section is provided, save everything
    if (!updatedSection) {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USER,
        document.$id,
        {
          bio: JSON.stringify(portfolio.bio),
          skills: JSON.stringify(portfolio.skills),
          workExperience: JSON.stringify(portfolio.workExperience),
          projects: JSON.stringify(portfolio.projects),
          contact: JSON.stringify(portfolio.contact),
          selectedTemplate: JSON.stringify(portfolio.selectedTemplate),
        }
      );
      return true;
    }

    // Otherwise, only save the specified section
    const updateData: Record<string, string> = {};

    switch (updatedSection) {
      case "bio":
        updateData.bio = JSON.stringify(portfolio.bio);
        break;
      case "skills":
        updateData.skills = JSON.stringify(portfolio.skills);
        break;
      case "workExperience":
        updateData.workExperience = JSON.stringify(portfolio.workExperience);
        break;
      case "projects":
        updateData.projects = JSON.stringify(portfolio.projects);
        break;
      case "contact":
        updateData.contact = JSON.stringify(portfolio.contact);
        break;
      case "template":
        updateData.selectedTemplate = JSON.stringify(
          portfolio.selectedTemplate
        );
        break;
      default:
        console.warn(`Unknown section: ${updatedSection}, saving all sections`);
        return await savePortfolio(portfolio, userId);
    }

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER,
      document.$id,
      updateData
    );

    return true;
  } catch (error) {
    console.error("Error saving portfolio:", error);
    return false;
  }
};

/**
 * Ensures a user document exists, creating one if it doesn't
 */
export const ensureUserDocument = async (userId: string): Promise<boolean> => {
  try {
    console.log("Checking if user document exists for:", userId);

    // Check if user document already exists
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      console.log("User document already exists");
      return true;
    }

    // Get user details from account
    const user = await account.get();
    console.log("Creating new user document for:", userId);

    // Create new user document
    await databases.createDocument(DATABASE_ID, COLLECTIONS.USER, ID.unique(), {
      userId,
      name: user.name || "",
      email: user.email || "",
      bio: "",
      skills: "[]",
      workExperience: "[]",
      projects: "[]",
      contact: "",
      selectedTemplate: JSON.stringify("Minimalist"),
    });

    console.log("Created new user document for:", userId);
    return true;
  } catch (error) {
    console.error("Error ensuring user document:", error);
    return false;
  }
};

/**
 * Initialize Appwrite and load data considering data freshness
 * @param userId The user ID to load data for
 * @param store The Redux store
 */
export const initializeAppwrite = async (
  userId: string,
  store: any
): Promise<void> => {
  try {
    const state = store.getState();
    const portfolio = state.portfolio;

    // Check if there are unsaved changes
    const hasPendingChanges = portfolio._sync?.isDirty || false;

    // Only load from DB if this is first load
    if (!portfolio._sync) {
      console.log("Loading fresh data from Appwrite");
      const portfolioData = await loadPortfolio(userId);

      if (Object.keys(portfolioData).length > 0) {
        store.dispatch(setPortfolioData(portfolioData));
        store.dispatch(markAsSynced());
      }
    } else {
      console.log("Using persisted data from localStorage (via Redux Persist)");

      // If there are pending changes, sync them to the server
      if (hasPendingChanges) {
        console.log("Syncing pending changes to Appwrite");
        const portfolioToSave = { ...portfolio };
        delete portfolioToSave._sync;

        await savePortfolio(portfolioToSave, userId);
        store.dispatch(markAsSynced());
      }
    }
  } catch (error) {
    console.error("Error initializing Appwrite:", error);
  }
};
