import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const aiService = {
  
   // Converts text into a vector array (3072 dimensions)
   
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const result = await embeddingModel.embedContent(text);
      const embedding = result.embedding;
      return embedding.values;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw error;
    }
  },

  // Generates a text response based on a prompt

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await chatModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  }
};