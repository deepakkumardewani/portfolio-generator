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
const DATABASE_ID = "67ec3593000b842f000f";
const COLLECTIONS = {
  BIO: "bio",
  SKILLS: "skills",
  WORK_EXPERIENCE: "work_experience",
  PROJECTS: "projects",
  CONTACT: "contact",
  TEMPLATE: "template",
};

/**
 * Save bio information to Appwrite
 */
export const saveBio = async (bio: Bio, userId: string) => {
  try {
    console.log("Saving bio to Appwrite");
    // Check if bio document already exists for the user
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.BIO,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      // Update existing document
      const docId = existingDocs.documents[0].$id;
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.BIO,
        docId,
        {
          ...bio,
          userId,
        }
      );
    } else {
      // Create new document
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.BIO,
        ID.unique(),
        {
          ...bio,
          userId,
        }
      );
    }
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
    // Fetch existing skills for the user
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SKILLS,
      [Query.equal("userId", userId)]
    );

    // Create a map of existing skills using value+category as the key
    const existingSkillsMap = new Map();
    for (const doc of existingDocs.documents) {
      const key = `${doc.value}:${doc.category}`;
      existingSkillsMap.set(key, {
        id: doc.$id,
        ...doc,
      });
    }

    // Track which skills have been processed
    const processedIds = new Set();

    // Update or create each skill
    const operations = skills.map((skill) => {
      const key = `${skill.value}:${skill.category}`;
      const existingSkill = existingSkillsMap.get(key);

      if (existingSkill) {
        // Mark this skill as processed
        processedIds.add(existingSkill.id);

        // Update existing document
        return databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.SKILLS,
          existingSkill.id,
          {
            value: skill.value,
            label: skill.label,
            image: skill.image,
            category: skill.category,
            userId,
          }
        );
      } else {
        // Create new document
        return databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.SKILLS,
          ID.unique(),
          {
            value: skill.value,
            label: skill.label,
            image: skill.image,
            category: skill.category,
            userId,
          }
        );
      }
    });

    // Delete skills that no longer exist in the input array
    const deleteOperations = Array.from(existingSkillsMap.values())
      .filter((skill) => !processedIds.has(skill.id))
      .map((skill) =>
        databases.deleteDocument(DATABASE_ID, COLLECTIONS.SKILLS, skill.id)
      );

    // Execute all operations
    await Promise.all([...operations, ...deleteOperations]);

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
    // Fetch existing work experience for the user
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.WORK_EXPERIENCE,
      [Query.equal("userId", userId)]
    );

    // Create a map of existing work experiences using company+jobTitle+fromDate as the key
    const existingWorkMap = new Map();
    for (const doc of existingDocs.documents) {
      const key = `${doc.company}:${doc.jobTitle}:${doc.fromDate}`;
      existingWorkMap.set(key, {
        id: doc.$id,
        ...doc,
      });
    }

    // Track which work experiences have been processed
    const processedIds = new Set();

    // Update or create each work experience
    const operations = workExperience.map((experience) => {
      const key = `${experience.company}:${experience.jobTitle}:${experience.fromDate}`;
      const existingExperience = existingWorkMap.get(key);

      if (existingExperience) {
        // Mark this experience as processed
        processedIds.add(existingExperience.id);

        // Update existing document
        return databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.WORK_EXPERIENCE,
          existingExperience.id,
          {
            company: experience.company,
            jobTitle: experience.jobTitle,
            fromDate: experience.fromDate,
            toDate: experience.toDate,
            description: experience.description,
            skills: JSON.stringify(experience.skills),
            userId,
          }
        );
      } else {
        // Create new document
        return databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.WORK_EXPERIENCE,
          ID.unique(),
          {
            company: experience.company,
            jobTitle: experience.jobTitle,
            fromDate: experience.fromDate,
            toDate: experience.toDate,
            description: experience.description,
            skills: JSON.stringify(experience.skills),
            userId,
          }
        );
      }
    });

    // Delete work experiences that no longer exist in the input array
    const deleteOperations = Array.from(existingWorkMap.values())
      .filter((experience) => !processedIds.has(experience.id))
      .map((experience) =>
        databases.deleteDocument(
          DATABASE_ID,
          COLLECTIONS.WORK_EXPERIENCE,
          experience.id
        )
      );

    // Execute all operations
    await Promise.all([...operations, ...deleteOperations]);

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
    // Fetch existing projects for the user
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.PROJECTS,
      [Query.equal("userId", userId)]
    );

    // Create a map of existing projects using title+link as the key
    const existingProjectsMap = new Map();
    for (const doc of existingDocs.documents) {
      const key = `${doc.title}:${doc.link}`;
      existingProjectsMap.set(key, {
        id: doc.$id,
        ...doc,
      });
    }

    // Track which projects have been processed
    const processedIds = new Set();

    // Update or create each project
    const operations = projects.map((project) => {
      const key = `${project.title}:${project.link}`;
      const existingProject = existingProjectsMap.get(key);

      if (existingProject) {
        // Mark this project as processed
        processedIds.add(existingProject.id);

        // Update existing document
        return databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.PROJECTS,
          existingProject.id,
          {
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            link: project.link,
            githubUrl: project.githubUrl || "",
            technologies: project.technologies ?? [],
            userId,
          }
        );
      } else {
        // Create new document
        return databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.PROJECTS,
          ID.unique(),
          {
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            link: project.link,
            githubUrl: project.githubUrl || "",
            technologies: project.technologies ?? [],
            userId,
          }
        );
      }
    });

    // Delete projects that no longer exist in the input array
    const deleteOperations = Array.from(existingProjectsMap.values())
      .filter((project) => !processedIds.has(project.id))
      .map((project) =>
        databases.deleteDocument(DATABASE_ID, COLLECTIONS.PROJECTS, project.id)
      );

    // Execute all operations
    await Promise.all([...operations, ...deleteOperations]);

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
    // Check if contact document already exists for the user
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.CONTACT,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      // Update existing document
      const docId = existingDocs.documents[0].$id;
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.CONTACT,
        docId,
        {
          phone: contact.phone,
          email: contact.email,
          links: JSON.stringify(contact.links),
          userId,
        }
      );
    } else {
      // Create new document
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CONTACT,
        ID.unique(),
        {
          phone: contact.phone,
          email: contact.email,
          links: JSON.stringify(contact.links),
          userId,
        }
      );
    }
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
    // Check if template document already exists for the user
    const existingDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TEMPLATE,
      [Query.equal("userId", userId)]
    );

    if (existingDocs.total > 0) {
      // Update existing document
      const docId = existingDocs.documents[0].$id;
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.TEMPLATE,
        docId,
        {
          selectedTemplate,
          userId,
        }
      );
    } else {
      // Create new document
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.TEMPLATE,
        ID.unique(),
        {
          selectedTemplate,
          userId,
        }
      );
    }
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
      COLLECTIONS.BIO,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0) {
      return null;
    }

    const bioDoc = response.documents[0];

    const bio = {
      name: bioDoc.name,
      tagline: bioDoc.tagline,
      about: bioDoc.about,
      profileImg: bioDoc.profileImg,
    };
    return bio;
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
      COLLECTIONS.SKILLS,
      [Query.equal("userId", userId)]
    );

    return response.documents.map((doc) => ({
      value: doc.value,
      label: doc.label,
      image: doc.image,
      category: doc.category,
    }));
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
      COLLECTIONS.WORK_EXPERIENCE,
      [Query.equal("userId", userId)]
    );

    return response.documents.map((doc) => ({
      company: doc.company,
      jobTitle: doc.jobTitle,
      fromDate: doc.fromDate,
      toDate: doc.toDate,
      description: doc.description,
      skills: JSON.parse(doc.skills),
    }));
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
      COLLECTIONS.PROJECTS,
      [Query.equal("userId", userId)]
    );

    return response.documents.map((doc) => ({
      title: doc.title,
      description: doc.description,
      imageUrl: doc.imageUrl,
      link: doc.link,
      githubUrl: doc.githubUrl,
      technologies:
        doc.technologies && doc.technologies.length > 0
          ? JSON.parse(doc.technologies)
          : undefined,
    }));
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
      COLLECTIONS.CONTACT,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0) {
      return null;
    }

    const contactDoc = response.documents[0];
    return {
      phone: contactDoc.phone,
      email: contactDoc.email,
      links: JSON.parse(contactDoc.links),
    };
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
      COLLECTIONS.TEMPLATE,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0) {
      return null;
    }

    const templateDoc = response.documents[0];
    return {
      selectedTemplate: templateDoc.selectedTemplate,
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
    const [bio, skills, workExperience, projects, contact, template] =
      await Promise.all([
        loadBio(userId),
        loadSkills(userId),
        loadWorkExperience(userId),
        loadProjects(userId),
        loadContact(userId),
        loadTemplate(userId),
      ]);

    const portfolioData: Partial<PortfolioState> = {};

    if (bio) portfolioData.bio = bio;
    if (skills.length > 0) portfolioData.skills = skills;
    if (workExperience.length > 0)
      portfolioData.workExperience = workExperience;
    if (projects.length > 0) portfolioData.projects = projects;
    if (contact) portfolioData.contact = contact;
    if (template) {
      portfolioData.selectedTemplate = template.selectedTemplate as any;
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
    // If no specific section is provided, save everything (backward compatibility)
    if (!updatedSection) {
      await Promise.all([
        saveBio(portfolio.bio, userId),
        saveSkills(portfolio.skills, userId),
        saveWorkExperience(portfolio.workExperience, userId),
        saveProjects(portfolio.projects, userId),
        saveContact(portfolio.contact, userId),
        saveTemplate(portfolio.selectedTemplate, userId),
      ]);
      return true;
    }

    // Otherwise, only save the specified section
    switch (updatedSection) {
      case "bio":
        await saveBio(portfolio.bio, userId);
        break;
      case "skills":
        await saveSkills(portfolio.skills, userId);
        break;
      case "workExperience":
        await saveWorkExperience(portfolio.workExperience, userId);
        break;
      case "projects":
        await saveProjects(portfolio.projects, userId);
        break;
      case "contact":
        await saveContact(portfolio.contact, userId);
        break;
      case "template":
        await saveTemplate(portfolio.selectedTemplate, userId);
        break;
      default:
        console.warn(`Unknown section: ${updatedSection}, saving all sections`);
        await Promise.all([
          saveBio(portfolio.bio, userId),
          saveSkills(portfolio.skills, userId),
          saveWorkExperience(portfolio.workExperience, userId),
          saveProjects(portfolio.projects, userId),
          saveContact(portfolio.contact, userId),
          saveTemplate(portfolio.selectedTemplate, userId),
        ]);
    }

    return true;
  } catch (error) {
    console.error("Error saving portfolio:", error);
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
