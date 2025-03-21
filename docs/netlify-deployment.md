# Netlify Deployment Setup

This document explains how to set up Netlify deployment for the portfolio generator application.

## Prerequisites

1. A Netlify account (https://app.netlify.com/)
2. A personal access token from Netlify

## Setting Up the Netlify Personal Access Token

1. Go to Netlify's user application settings: https://app.netlify.com/user/applications#personal-access-tokens
2. Click "New access token"
3. Enter a description for your token (e.g., "Portfolio Generator App")
4. Choose an appropriate scope (at minimum, select "sites:read" and "sites:write")
5. Click "Generate token"
6. Copy the generated token

## Configuring the Application

1. Create a `.env.local` file in the root of the project (if it doesn't already exist)
2. Add the following line to the file, replacing `your_netlify_personal_access_token` with the token you generated:
   ```
   NETLIFY_API_TOKEN=your_netlify_personal_access_token
   ```
3. Restart the development server for the changes to take effect

## How the Deployment Works

The application uses the Netlify API to:

1. Create a new site (if one doesn't already exist for the user)
2. Generate and zip the portfolio files
3. Deploy the zip file to the Netlify site
4. Track the deployment progress and provide the live URL when ready

## Troubleshooting

If you encounter issues with the Netlify deployment:

1. Verify that your personal access token is correct and has the necessary permissions
2. Check the server logs for detailed error messages
3. Ensure that the `.env.local` file is properly formatted
4. Make sure the zip file generation is working correctly (you can test by exporting to static files)
