import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const factExtractionModel = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

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
  },

   async extractFacts(text: string): Promise<string[]> {
    const prompt = `
    Analyze the following user log entry. 
    Extract distinct, atomic facts about the user's habits, preferences, mental state, or health.
    Ignore generic statements. Focus on cause-and-effect or recurring patterns.
    
    Log: "${text}"
    
    Output a JSON list of strings. Example: ["User feels tired after eating sugar", "User prefers working in the morning"]
    `;

    try {
      const result = await factExtractionModel.generateContent(prompt);
      const responseText = result.response.text();
      return JSON.parse(responseText) as string[]; 
    } catch (error) {
      console.error("Error extraction facts:", error);
      return []; 
    }
  }
};