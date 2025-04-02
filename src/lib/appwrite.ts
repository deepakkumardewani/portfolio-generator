import { Client, Account, ID, Models, OAuthProvider } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

// Initialize Appwrite account
export const account = new Account(client);

// Export the ID utility for generating unique IDs
export { ID, OAuthProvider };
