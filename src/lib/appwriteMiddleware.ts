import { Middleware, UnknownAction } from "redux";
import { savePortfolio } from "./appwriteService";
import { account } from "./appwrite";
import { markAsDirty, markAsSynced } from "@/store";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import logger from "@/lib/logger";
// Define a type for the middleware without circular reference
type AppwriteMiddlewareType = Middleware<{}, any>;

// Map action types to portfolio sections
const ACTION_TO_SECTION: Record<string, string> = {
  "portfolio/setBio": "bio",
  "portfolio/setSkills": "skills",
  "portfolio/setWorkExperience": "workExperience",
  "portfolio/addProject": "projects",
  "portfolio/setContact": "contact",
  "portfolio/setTheme": "template",
  "portfolio/setTemplate": "template",
  "portfolio/updateTemplateSection": "template",
  "portfolio/updateTemplateSections": "template",
};

// Create debounced sync function
const debouncedSync = debounce(
  (store: any, portfolio: any, userId: string, updatedSection?: string) => {
    const saveToAppwrite = async () => {
      try {
        // Remove _sync field before saving
        const portfolioToSave = { ...portfolio };
        delete portfolioToSave._sync;

        await savePortfolio(portfolioToSave, userId, updatedSection);
        logger.info(
          `Successfully synced ${
            updatedSection || "all sections"
          } with Appwrite`
        );

        // Mark as synced
        store.dispatch(markAsSynced());
      } catch (error) {
        logger.error(`Error syncing with Appwrite: ${error}`);
      }
    };

    saveToAppwrite();
  },
  500
); // 2-second debounce

/**
 * Redux middleware to sync store changes with Appwrite
 * This will automatically save changes to Appwrite when the store is updated
 */
export const appwriteMiddleware: AppwriteMiddlewareType =
  (store) => (next) => (action) => {
    // Get state before action
    const prevState = store.getState();
    const prevPortfolio = { ...prevState.portfolio };

    // First, let the action go through to update the store
    const result = next(action);

    // Get the updated state
    const state = store.getState();
    const newPortfolio = { ...state.portfolio };

    // Only sync specific portfolio-related actions
    const portfolioActions = [
      "portfolio/setBio",
      "portfolio/setSkills",
      "portfolio/setWorkExperience",
      "portfolio/addProject",
      "portfolio/setContact",
      "portfolio/setTheme",
      "portfolio/setTemplate",
      "portfolio/updateTemplateSection",
      "portfolio/updateTemplateSections",
    ];

    // Check if this is an action we want to sync
    if (portfolioActions.includes((action as UnknownAction).type)) {
      // Get the section that was updated
      const updatedSection = ACTION_TO_SECTION[(action as UnknownAction).type];

      // Create clean copies for comparison
      const prevData = { ...prevPortfolio };
      const newData = { ...newPortfolio };
      delete prevData._sync;
      delete newData._sync;

      // Check if data actually changed
      if (!isEqual(prevData, newData)) {
        logger.info(
          `Data changed in section: ${
            updatedSection || "unknown"
          }, scheduling sync with Appwrite`
        );

        // Mark as dirty
        store.dispatch(markAsDirty());

        // Get the current user ID asynchronously but don't block UI
        const prepareSync = async () => {
          try {
            // Try to get the current user
            const user = await account.get();
            if (user) {
              // Schedule debounced sync
              debouncedSync(store, newPortfolio, user.$id, updatedSection);
            } else {
              logger.info("User not authenticated, skipping sync to Appwrite");
            }
          } catch (error) {
            logger.error("Error preparing sync with Appwrite:", error);
          }
        };

        // Execute but don't wait for it to complete
        prepareSync();
      } else {
        logger.info("No actual data changes detected, skipping sync");
      }
    }

    return result;
  };
