import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const hasGeminiKey = !!process.env.GEMINI_API_KEY;

export const ai = hasGeminiKey
  ? genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    })
  : null;
