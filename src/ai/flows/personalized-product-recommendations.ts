'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user browsing history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AI_ENABLED = !!process.env.GEMINI_API_KEY;

// =====================
// Schemas
// =====================

const PersonalizedRecommendationsInputSchema = z.object({
  userHistory: z.string().describe('The user browsing and purchase history.'),
  productCatalog: z.string().describe('The available products with descriptions.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of product recommendations tailored to the user.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

// =====================
// Optional AI Flow
// =====================

let personalizedRecommendationsFlow:
  | ((input: PersonalizedRecommendationsInput) => Promise<PersonalizedRecommendationsOutput>)
  | null = null;

if (AI_ENABLED) {
  const prompt = ai.definePrompt({
    name: 'personalizedRecommendationsPrompt',
    input: { schema: PersonalizedRecommendationsInputSchema },
    output: { schema: PersonalizedRecommendationsOutputSchema },
    prompt: `Based on the user's history: {{{userHistory}}}, and the following product catalog: {{{productCatalog}}}, recommend products the user might be interested in.
Return the recommendations as a list.`,
  });

  personalizedRecommendationsFlow = ai.defineFlow(
    {
      name: 'personalizedRecommendationsFlow',
      inputSchema: PersonalizedRecommendationsInputSchema,
      outputSchema: PersonalizedRecommendationsOutputSchema,
    },
    async input => {
      const { output } = await prompt(input);
      return output!;
    }
  );
}

// =====================
// Public API
// =====================

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  if (!personalizedRecommendationsFlow) {
    return {
      recommendations:
        'Personalized recommendations are currently unavailable.',
    };
  }

  const result = await personalizedRecommendationsFlow(input);

  if (typeof result?.recommendations === 'string') {
    return result;
  }

  return { recommendations: '' };
}
