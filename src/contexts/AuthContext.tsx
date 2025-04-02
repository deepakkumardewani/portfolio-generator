import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Models } from "appwrite";
import { account, ID, OAuthProvider } from "@/lib/appwrite";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  signIn: (provider: "github" | "google") => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        try {
          const session = await account.get();
          console.log("session", session);
          setUser(session);
        } catch (error) {
          console.error("Session check error:", error);
          // No active session - user is not logged in
        }
        setLoading(false);
      } catch (err) {
        console.error("Auth initialization error:", err);
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      // No cleanup needed for Appwrite
    };
  }, [router]);

  const signIn = async (provider: "github" | "google") => {
    try {
      const successUrl = `${window.location.origin}/create`;
      const failureUrl = `${window.location.origin}/`;
      const scopes = ["profile", "email"];
      // Map our provider string to Appwrite's OAuthProvider enum
      const appwriteProvider =
        provider === "github" ? OAuthProvider.Github : OAuthProvider.Google;

      try {
        // Create OAuth2 session with provider
        account.createOAuth2Session(
          appwriteProvider,
          successUrl,
          failureUrl,
          scopes
        );
      } catch (err) {
        console.error("Sign in error:", err);
        throw err;
      }
    } catch (err) {
      console.error("Sign in error:", err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Get user after successful login
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err) {
      console.error("Sign in error:", err);
      throw err;
    }
  };

  const getUser = async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Create a unique user ID
      const userId = ID.unique();

      // Create the user
      await account.create(userId, email, password);

      // Automatically sign in after sign up
      await signInWithEmail(email, password);

      // Redirect to create page
      router.push("/create");
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signInWithEmail,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
