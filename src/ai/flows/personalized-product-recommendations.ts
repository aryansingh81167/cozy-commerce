'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user browsing history.
 *
 * - getPersonalizedRecommendations - A function to retrieve personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userHistory: z.string().describe('The user browsing and purchase history.'),
  productCatalog: z.string().describe('The available products with descriptions.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('A list of product recommendations tailored to the user.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  const result = await personalizedRecommendationsFlow(input);
  // Ensure we always return an object that matches the output schema
  if (typeof result?.recommendations === 'string') {
    return result;
  }
  return { recommendations: '' };
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Based on the user\'s history: {{{userHistory}}}, and the following product catalog: {{{productCatalog}}}, recommend products the user might be interested in.\n  Return the recommendations as a list.\n  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
