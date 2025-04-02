# Appwrite Setup Guide

This project now uses Appwrite for authentication. Follow these steps to set up your Appwrite project:

## 1. Create an Appwrite Account

If you don't have an Appwrite account yet, sign up at [cloud.appwrite.io](https://cloud.appwrite.io).

## 2. Create a New Project

1. Log in to your Appwrite console
2. Click "Create Project"
3. Name your project (e.g., "Portfolio Generator")
4. Click "Create"

## 3. Set Up Authentication

1. In your project dashboard, go to the "Auth" section
2. Enable the authentication methods you want to use:
   - Email/Password: Turn on "Email/Password" authentication
   - For OAuth providers (GitHub, Google):
     - GitHub: Follow Appwrite's guide to set up GitHub OAuth
     - Google: Follow Appwrite's guide to set up Google OAuth

## 4. Set Up Your Platform

1. Go to the "Settings" section in your project
2. Select "Platforms" and click "Add Platform"
3. Choose "Web App"
4. Enter your website domain (during development, use `localhost`)
5. Save the platform

## 5. Update Environment Variables

In your project's `.env.local` file, update these variables:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
```

Replace `your-project-id` with the actual Project ID from your Appwrite dashboard (found in Project Settings).

## 6. Testing Authentication

After completing the setup, you should be able to:

1. Sign up with email/password
2. Log in with email/password
3. Authenticate with OAuth providers (if configured)

## Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Authentication with Appwrite](https://appwrite.io/docs/client/account)
- [Migrating from Firebase to Appwrite](https://appwrite.io/docs/migrations/firebase)
