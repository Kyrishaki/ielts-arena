import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
export const genAI = new GoogleGenerativeAI(apiKey);

export async function generateGeminiContent(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      ...(systemInstruction ? { systemInstruction } : {}),
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.warn("Gemini API direct call notice:", error);
    throw error;
  }
}
