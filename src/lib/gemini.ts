import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21", // Using a reasoning model as proxy for 'Gemini 3 Deep Think' if not available, or standard Pro.
    // Note: 'gemini-3' is not a standard public model name yet, assuming user implies latest reasoning model.
    // I will use a placeholder or specific model if known. 
    // For 'Deep Think', the thinking experimental model is the closest match currently available in many contexts.
});
