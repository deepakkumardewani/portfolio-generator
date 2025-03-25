// LinkedIn OAuth and API Integration

// LinkedIn API endpoints
const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/me";
const LINKEDIN_EMAIL_URL =
  "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";
const LINKEDIN_EXPERIENCE_URL = "https://api.linkedin.com/v2/positions";
// const LINKEDIN_PROFILE_PICTURE_URL =
//   "https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))";

// LinkedIn scope for permissions
const SCOPE = "profile email";

// Environment variables
const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || "";
const CLIENT_SECRET = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || "";

/**
 * Initiates LinkedIn OAuth flow
 * @returns {string} Authorization URL
 */
export function getLinkedInAuthUrl(): string {
  if (!CLIENT_ID) {
    console.error("LinkedIn Client ID is not defined");
    throw new Error("LinkedIn Client ID is not defined");
  }

  if (!REDIRECT_URI) {
    console.error("LinkedIn Redirect URI is not defined");
    throw new Error("LinkedIn Redirect URI is not defined");
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    state: generateRandomState(),
  });

  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
}

/**
 * Generates a random state string for OAuth security
 */
function generateRandomState(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Exchange authorization code for access token
 * @param code Authorization code from LinkedIn callback
 * @returns Access token
 */
export async function getAccessToken(code: string): Promise<string> {
  if (!CLIENT_ID) {
    throw new Error("LinkedIn Client ID is not defined");
  }

  if (!CLIENT_SECRET) {
    throw new Error("LinkedIn Client Secret is not defined");
  }

  if (!REDIRECT_URI) {
    throw new Error("LinkedIn Redirect URI is not defined");
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  });

  try {
    console.log("Sending request to LinkedIn token endpoint...");

    const response = await fetch(LINKEDIN_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("LinkedIn token error:", data);
      throw new Error(
        data.error_description ||
          `Failed to get access token: ${response.status}`
      );
    }

    console.log("LinkedIn token request successful");
    return data.access_token;
  } catch (error) {
    console.error("Error getting LinkedIn access token:", error);
    throw new Error(
      error instanceof Error
        ? `LinkedIn authentication failed: ${error.message}`
        : "LinkedIn authentication failed"
    );
  }
}

/**
 * Fetch profile data from LinkedIn
 * @param accessToken LinkedIn access token
 */
export async function fetchLinkedInProfile(accessToken: string) {
  try {
    console.log("Fetching LinkedIn profile...");

    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("Base URL is not defined");
    }

    // Basic profile using proxy
    const profileResponse = await fetch(`${baseUrl}/api/linkedin/proxy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        endpoint: "/me",
        accessToken,
      }),
    });

    const profileData = await profileResponse.json();

    // If we get an error response, return empty data structure instead of null
    if (!profileResponse.ok) {
      console.error("LinkedIn profile fetch error:", profileData);
      return {
        profile: { localizedFirstName: "", localizedLastName: "", id: "" },
        email: { elements: [] },
        experience: { elements: [] },
        profilePicture: {},
      };
    }

    // Email using proxy - only if profile fetch was successful
    const emailResponse = await fetch(`${baseUrl}/api/linkedin/proxy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        endpoint: "/emailAddress?q=members&projection=(elements*(handle~))",
        accessToken,
      }),
    });

    let email = { elements: [] };
    if (emailResponse.ok) {
      email = await emailResponse.json();
    } else {
      console.warn(
        "Could not fetch LinkedIn email. This may be due to scope limitations."
      );
    }

    return {
      profile: profileData,
      email,
      experience: { elements: [] },
      profilePicture: {},
    };
  } catch (error) {
    console.error("Error fetching LinkedIn data:", error);
    // Return empty data structure instead of null to prevent infinite loops
    return {
      profile: { localizedFirstName: "", localizedLastName: "", id: "" },
      email: { elements: [] },
      experience: { elements: [] },
      profilePicture: {},
    };
  }
}

/**
 * Parse LinkedIn profile data into portfolio format
 * @param profileData LinkedIn profile data
 * @returns Formatted portfolio data
 */
export function parseLinkedInData(profileData: any) {
  // Return empty data if profileData is null
  if (!profileData) {
    return {
      bio: {
        name: "",
        tagline: "",
        about: "",
      },
      contact: {
        email: "",
        phone: "",
        links: [],
      },
      workExperience: [],
      profilePictureUrl: "",
    };
  }

  const { profile, email, experience, profilePicture } = profileData;

  // Extract email address
  const emailAddress = email?.elements?.[0]?.["handle~"]?.emailAddress || "";

  // Extract profile picture if available
  let profilePictureUrl = "";
  if (
    profilePicture.profilePicture &&
    profilePicture.profilePicture["displayImage~"] &&
    profilePicture.profilePicture["displayImage~"].elements
  ) {
    const pictures = profilePicture.profilePicture["displayImage~"].elements;
    // Get highest quality image
    if (pictures.length > 0) {
      profilePictureUrl =
        pictures[pictures.length - 1].identifiers[0].identifier;
    }
  }

  // Extract work experience
  const workExperience =
    experience.elements?.map((job: any) => ({
      company: job.companyName,
      jobTitle: job.title,
      skills: [],
      fromDate: job.startDate
        ? `${job.startDate.year}-${job.startDate.month
            .toString()
            .padStart(2, "0")}-01`
        : "",
      toDate: job.endDate
        ? `${job.endDate.year}-${job.endDate.month
            .toString()
            .padStart(2, "0")}-01`
        : "Present",
      description: job.description || "",
    })) || [];

  return {
    bio: {
      name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
      tagline: profile.headline || "",
      about: profile.summary || "",
    },
    contact: {
      email: emailAddress,
      phone: "",
      links: [
        {
          label: "LinkedIn",
          url: `https://www.linkedin.com/in/${
            profile.vanityName || profile.id
          }`,
        },
      ],
    },
    workExperience,
    profilePictureUrl,
  };
}
