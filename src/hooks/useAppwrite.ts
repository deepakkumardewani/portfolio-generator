import { useState, useEffect } from "react";
import { account } from "../lib/appwrite";
import { Models, OAuthProvider } from "appwrite";

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

      // Login after registration
      await login(email, password);

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

  const oauthLogin = async (provider: string) => {
    try {
      setLoading(true);
      setError(null);

      const providerEnum =
        provider === "google" ? OAuthProvider.Google : OAuthProvider.Github;
      const successUrl = `${window.location.origin}/create`;
      const failureUrl = `${window.location.origin}`;
      // Create OAuth2 session for Google
      account.createOAuth2Session(
        providerEnum,
        successUrl, // Success URL
        failureUrl // Failure URL
      );

      // The user will be redirected to Google's login page
      // After successful login, they'll be redirected back to your app
      // The session will be automatically created

      // Get the logged-in user
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google");
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
