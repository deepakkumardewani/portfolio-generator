## Suggested Prompt and System for `streamText`

The `streamText` function in the Vercel AI SDK allows you to generate text by providing a `system` (defining the AI's role) and a `prompt` (the user’s input). For a portfolio description generator:

- **System**: Defines the AI’s behavior and tone.

  - **Suggested System**:
    ```
    You are a professional portfolio description writer. Your task is to create concise, engaging, and impactful descriptions based on the provided keywords and section type (e.g., personal info, project, experience). Highlight the user’s skills, achievements, and relevance to the section. Use a professional yet approachable tone unless otherwise specified.
    ```

- **Prompt**: Provides specific input to generate the description.
  - **Suggested Prompt**:
    ```
    Generate a description for the "{section}" section using these keywords: {keywords}.
    ```
  - **Example**:
    ```
    Generate a description for the "experience" section using these keywords: React, frontend, performance optimization.
    ```

This setup leverages the `system` to set the AI’s role and the `prompt` to provide context, ensuring the output is tailored and relevant. Per the `streamText` documentation, these inputs are passed to the model, and the response is streamed back for real-time display.

---

## Detailed Implementation Plan

Below is a step-by-step plan to implement the AI-powered portfolio description generator using the Vercel AI SDK’s `streamText`. Each step is small, specific, and includes a test to validate correct implementation.

### Step 1: Create the API Route File

- **Instruction**: In your Next.js project, create a new file at `/api/generate-description.ts` to handle description generation requests.

### Step 2: Import Required Modules in the API Route

- **Instruction**: In `/api/generate-description.ts`, import `streamText` from `'ai'` and your AI provider (e.g., `openai` from `'@ai-sdk/openai'`).

### Step 3: Define the POST Handler in the API Route

- **Instruction**: In `/api/generate-description.ts`, define an asynchronous POST function that accepts a request and returns a response.

### Step 4: Extract Keywords and Section from the Request

- **Instruction**: Inside the POST function, extract `keywords` and `section` from the request body (e.g., `req.body.keywords` and `req.body.section`).

### Step 5: Construct the Prompt in the API Route

- **Instruction**: In the POST function, create a prompt string using the extracted `keywords` and `section`, e.g., `Generate a description for the "${section}" section using these keywords: ${keywords}.`.

### Step 6: Call `streamText` with System and Prompt

- **Instruction**: In the POST function, use `streamText` with the suggested system (from above) and the constructed prompt, passing your AI model (e.g., `openai('gpt-3.5-turbo')`).

### Step 7: Return the Streamed Response

- **Instruction**: In the POST function, convert the `streamText` response to an AI stream response using `toAIStreamResponse` and return it.

### Step 8: Add Keyword Input Field to Personal Info Form

- **Instruction**: In `InfoForm.tsx`, add a text input field named `keywords` using `react-hook-form`, with a placeholder like "Enter keywords (e.g., React, design)".

### Step 9: Add Keyword Input Field to Projects Form

- **Instruction**: In `ProjectsForm.tsx`, add a text input field named `keywords` using `react-hook-form`, with a similar placeholder.

### Step 10: Add Keyword Input Field to Experience Form

- **Instruction**: In `ExperienceForm.tsx`, add a text input field named `keywords` using `react-hook-form`, with a similar placeholder.

### Step 11: Add Generate Description Button to Forms

- **Instruction**: In each form (`InfoForm.tsx`, `ProjectsForm.tsx`, `ExperienceForm.tsx`), add a button labeled "Generate Description" next to the keyword input.

### Step 12: Disable Button During Form Submission

- **Instruction**: In each form, disable the "Generate Description" button when the form is submitting (e.g., use `react-hook-form`’s `formState.isSubmitting`).

### Step 13: Set Up State for Description and Loading

- **Instruction**: In each form component, add two `useState` hooks: one for `description` (initially `""`) and one for `isLoading` (initially `false`).

### Step 14: Import `useChat` Hook in Forms

- **Instruction**: In each form component, import `useChat` from `'ai/react'` to handle AI interactions.

### Step 15: Configure `useChat` with API Route

- **Instruction**: In each form, initialize `useChat` with the API route `/api/generate-description` as the `api` option.

### Step 16: Handle Button Click to Generate Description

- **Instruction**: In each form, add an `onClick` handler to the "Generate Description" button that calls `useChat`’s `append` function with `{ role: "user", content: prompt }`, where `prompt` is constructed from the form’s `keywords` and `section`.

### Step 17: Update Description State on Response

- **Instruction**: In each form, use `useChat`’s `onResponse` callback to update the `description` state with the streamed text.

### Step 18: Display Generated Description in Form

- **Instruction**: In each form, add a `<textarea>` or `<p>` element to display the `description` state value.

### Step 19: Show Loading Indicator During Generation

- **Instruction**: In each form, display a loading indicator (e.g., a spinner) when `isLoading` is `true`; set `isLoading` to `true` before calling `append` and `false` in `onResponse`.

### Step 20: Add Regenerate Button

- **Instruction**: In each form, add a "Try Again" button next to the description that re-triggers the `append` function with the same prompt.

### Step 21: Style Description with Streaming Effect

- **Instruction**: In each form, use Tailwind CSS (e.g., `animate-pulse` or a custom animation) to style the description text for a streaming effect.

### Step 22: Add Error Handling in Forms

- **Instruction**: In each form, use `useChat`’s `onError` callback to set an error state and display a message like "Failed to generate description".
