import { Client, Databases, ID, Query, Permission, Role } from "appwrite";
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
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

// Initialize Appwrite services
const databases = new Databases(client);

// Database and collections constants
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const USER_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "";

/**
 * Create a new user document when a user signs up
 */
export const createUserDocument = async (
  userId: string,
  name: string,
  email: string
) => {
  try {
    // Check if user document already exists
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      return existingDocs.documents[0];
    }

    // Create new user document
    const newUser = await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
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
        deploymentDetails: "",
        remainingRequests: 10,
        allowedRequestsPerDay: 10,
        requestsLastResetAt: new Date().toISOString(),
      },
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );
    return newUser;
  } catch (error) {
    // Handle specific error for duplicate documents
    // This helps in case two requests try to create a document simultaneously
    if (error instanceof Error && error.message.includes("duplicate")) {
      // Retrieve the existing document instead
      const docs = await databases.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      if (docs.total > 0) {
        return docs.documents[0];
      }
    }
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
      USER_COLLECTION_ID,
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
          USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
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
      USER_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    console.log("response", response);
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

    // Add request count fields
    if (typeof userDoc.remainingRequests === "number") {
      portfolioData.remainingRequests = userDoc.remainingRequests;
    } else {
      portfolioData.remainingRequests = 10; // Default value
    }

    if (typeof userDoc.allowedRequestsPerDay === "number") {
      portfolioData.allowedRequestsPerDay = userDoc.allowedRequestsPerDay;
    } else {
      portfolioData.allowedRequestsPerDay = 10; // Default value
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
        USER_COLLECTION_ID,
        document.$id,
        {
          bio: JSON.stringify(portfolio.bio),
          skills: JSON.stringify(portfolio.skills),
          workExperience: JSON.stringify(portfolio.workExperience),
          projects: JSON.stringify(portfolio.projects),
          contact: JSON.stringify(portfolio.contact),
          selectedTemplate: JSON.stringify(portfolio.selectedTemplate),
          // Don't update request counts here as they're managed separately
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      return true;
    }

    // Otherwise, only save the specified section
    const updateData: Record<string, string | number> = {};

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
      case "requestCounts":
        updateData.remainingRequests = portfolio.remainingRequests;
        updateData.allowedRequestsPerDay = portfolio.allowedRequestsPerDay;
        break;
      default:
        console.warn(`Unknown section: ${updatedSection}, saving all sections`);
        return await savePortfolio(portfolio, userId);
    }

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      document.$id,
      updateData,
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );

    return true;
  } catch (error) {
    console.error("Error saving portfolio:", error);
    return false;
  }
};

/**
 * Clear the persisted portfolio state from localStorage
 * Call this on login to ensure we're loading fresh data
 */
export const clearPersistedState = (): void => {
  localStorage.removeItem("persist:portfolio");
  console.log("Cleared persisted portfolio state from localStorage");
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

    // Always load fresh data from Appwrite first
    console.log("Loading fresh data from Appwrite");
    const portfolioData = await loadPortfolio(userId);

    console.log("portfolioData", portfolioData);
    // Check if Appwrite has any data
    const hasAppwriteData = Object.keys(portfolioData).length > 0;

    if (hasAppwriteData) {
      console.log("Found data in Appwrite, updating Redux store");
      store.dispatch(setPortfolioData(portfolioData));
      store.dispatch(markAsSynced());
      return;
    }

    // If no data in Appwrite but we have local changes, sync them to Appwrite
    const hasPendingChanges = portfolio._sync?.isDirty || false;
    const hasLocalData = Object.keys(portfolio).some((key) => {
      if (key === "_sync" || key === "_persist") return false;

      if (Array.isArray(portfolio[key])) {
        return portfolio[key].length > 0;
      }

      if (typeof portfolio[key] === "object" && portfolio[key] !== null) {
        return Object.values(portfolio[key]).some(
          (val) => val !== null && val !== undefined && val !== ""
        );
      }

      return (
        portfolio[key] !== null &&
        portfolio[key] !== undefined &&
        portfolio[key] !== ""
      );
    });

    if (hasLocalData) {
      console.log(
        "No data in Appwrite but found local data, syncing to server"
      );
      const portfolioToSave = { ...portfolio };
      delete portfolioToSave._sync;
      delete portfolioToSave._persist;

      await savePortfolio(portfolioToSave, userId);
      store.dispatch(markAsSynced());
    } else {
      console.log("No data found in Appwrite or locally");
    }
  } catch (error) {
    console.error("Error initializing Appwrite:", error);
  }
};

/**
 * Get the remaining requests count for a user
 */
export const getRemainingRequests = async (
  userId: string
): Promise<{
  remainingRequests: number;
  allowedRequestsPerDay: number;
}> => {
  console.log("Getting remaining requests for user:", userId);
  try {
    const { document } = await getUserDocument(userId);
    console.log("document", document);
    return {
      remainingRequests: document.remainingRequests || 0,
      allowedRequestsPerDay: document.allowedRequestsPerDay || 10,
    };
  } catch (error) {
    console.error("Error getting remaining requests:", error);
    return {
      remainingRequests: 0,
      allowedRequestsPerDay: 10,
    };
  }
};

/**
 * Update the remaining requests count for a user
 */
export const updateRemainingRequests = async (
  userId: string,
  count: number
): Promise<boolean> => {
  try {
    const { document } = await getUserDocument(userId);

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      document.$id,
      { remainingRequests: count }
    );

    return true;
  } catch (error) {
    console.error("Error updating remaining requests:", error);
    return false;
  }
};

/**
 * Reset the remaining requests for a user to their allowed daily limit
 */
export const resetRemainingRequests = async (
  userId: string
): Promise<boolean> => {
  try {
    const { document } = await getUserDocument(userId);
    const allowedRequests = document.allowedRequestsPerDay || 10;

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      document.$id,
      { remainingRequests: allowedRequests }
    );

    return true;
  } catch (error) {
    console.error("Error resetting remaining requests:", error);
    return false;
  }
};

export const createPortfolioDocument = async (
  portfolioId: string,
  userId: string
) => {
  try {
    await databases.createDocument(
      DATABASE_ID,
      "portfolio_analytics",
      ID.unique(),
      {
        userId,
        portfolioId,
      }
    );
  } catch (error) {
    console.error("Error creating portfolio document:", error);
    return false;
  }
};
