import { Middleware, UnknownAction } from "redux";
import { savePortfolio } from "./appwriteService";
import { account } from "./appwrite";

// Define a type for the middleware without circular reference
type AppwriteMiddlewareType = Middleware<{}, any>;

/**
 * Redux middleware to sync store changes with Appwrite
 * This will automatically save changes to Appwrite when the store is updated
 */
export const appwriteMiddleware: AppwriteMiddlewareType =
  (store) => (next) => (action) => {
    // First, let the action go through to update the store
    const result = next(action);

    // Get the updated state
    const state = store.getState();

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
      // Get the current user ID asynchronously but don't block UI
      const syncWithAppwrite = async () => {
        try {
          // Try to get the current user
          const user = await account.get();
          if (user) {
            // Save to Appwrite
            await savePortfolio(state.portfolio, user.$id);
          } else {
            console.log("User not authenticated, skipping sync to Appwrite");
          }
        } catch (error) {
          console.error("Error syncing with Appwrite:", error);
        }
      };

      // Execute but don't wait for it to complete
      syncWithAppwrite();
    }

    return result;
  };
