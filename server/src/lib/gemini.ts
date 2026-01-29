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
  },

  async updateDailySummary(currentSummary: string | null, newLogEntry: string): Promise<string> {
    let prompt = "";

    if (!currentSummary) {
      prompt = `
      Summarize this log entry into a coherent narrative for the day.
      Log: "${newLogEntry}"
      Summary:
      `;
    } else {
      prompt = `
      You are maintaining a daily journal summary.
      
      Current Summary of the day:
      "${currentSummary}"
      
      New Event to add:
      "${newLogEntry}"
      
      Task: Rewrite the Daily Summary to flow naturally including the new event. 
      Keep it concise but capture the mood and key activities.
      Updated Summary:
      `;
    }

    try {
      const result = await chatModel.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error generating summary:", error);
      throw error;
    }
  },

  // Chain of Verification 
  async generateVerifiedResponse(originalPrompt: string, contextData: string): Promise<string> {
    try {
      // Generate the Draft (The "Writer")
      const draftResult = await chatModel.generateContent(originalPrompt);
      const draftAnswer = draftResult.response.text();

      // Verify the Draft (The "Editor")
      const critiquePrompt = `
      You are a strict Fact-Checking Editor.
      
      ### SOURCE DATA (The only truth):
      ${contextData}
      
      ### DRAFT ANSWER:
      ${draftAnswer}
      
      ### TASK:
      1. Verify if the Draft Answer contains any claims NOT supported by the Source Data.
      2. Verify if the tone is empathetic but objective.
      
      ### OUTPUT INSTRUCTIONS:
      - If the Draft Answer is accurate based *only* on the Source Data, respond with exactly: "VALID"
      - If the Draft Answer contains hallucinations or is rude, rewrite the answer completely to be accurate.
      `;

      const critiqueResult = await chatModel.generateContent(critiquePrompt);
      const critiqueResponse = critiqueResult.response.text().trim();

      // Logic: Return Draft or Correction
      if (critiqueResponse.toUpperCase().includes("VALID")) {
        console.log("[CoVe] Draft verified successfully.");
        return draftAnswer;
      } else {
        console.log("[CoVe] Hallucination detected. Returning corrected version.");
        return critiqueResponse;
      }

    } catch (error) {
      console.error("Error in verification chain:", error);
      // Fallback: If verification fails, just return the first draft (better than nothing)
      return this.generateResponse(originalPrompt);
    }
  }
};