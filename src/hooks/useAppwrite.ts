import { useState, useEffect } from "react";
import { account } from "../lib/appwrite";
import { Models, OAuthProvider } from "appwrite";
import { createUserDocument } from "../lib/appwriteService";

interface UseAppwriteReturn {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<Models.User<Models.Preferences>>;
  logout: () => Promise<void>;
  oauthLogin: (provider: string) => Promise<void>;
}

/**
 * Hook to handle Appwrite authentication
 */
export const useAppwrite = (): UseAppwriteReturn => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentUser = await account.get();
        console.log("currentUser", currentUser);
        setUser(currentUser);
      } catch (err) {
        // User is not logged in, don't show error
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Create email session
      await account.createSession(email, password);

      // Get the logged-in user
      const currentUser = await account.get();
      setUser(currentUser);

      // Redirect to create page after successful login
      window.location.href = "/create";
    } catch (err: any) {
      setError(err.message || "Failed to log in");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register a new user
  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<Models.User<Models.Preferences>> => {
    try {
      setLoading(true);
      setError(null);

      // Create a new account
      const newUser = await account.create("unique()", email, password, name);
      console.log("Created new account:", newUser.$id);

      // Create user document in the database
      await createUserDocument(newUser.$id, name, email);
      console.log("Created user document for:", newUser.$id);

      // Login after registration
      await login(email, password);

      // No need to redirect - the login function will handle redirection

      return newUser;
    } catch (err: any) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Delete current session
      await account.deleteSession("current");

      setUser(null);
    } catch (err: any) {
      setError(err.message || "Failed to log out");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with OAuth provider (Google, GitHub)
  const oauthLogin = async (provider: string) => {
    try {
      setLoading(true);
      setError(null);

      const providerEnum =
        provider === "google" ? OAuthProvider.Google : OAuthProvider.Github;

      // Redirect to OAuth callback page instead of directly to create page
      const successUrl = `${window.location.origin}/auth/callback`;
      const failureUrl = `${window.location.origin}`;

      // Create OAuth2 session for the provider
      account.createOAuth2Session(
        providerEnum,
        successUrl, // Callback page that will handle document creation
        failureUrl // Failure URL
      );

      // Note: Code after this point will NOT execute due to the redirect
    } catch (err: any) {
      setError(err.message || `Failed to log in with ${provider}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    oauthLogin,
  };
};
