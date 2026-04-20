import { GoogleGenerativeAI } from "@google/generative-ai";

export class SwimCoachEngine {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  /**
   * Initializes the Google AI SDK.
   * Using 'gemini-flash-latest' for the most up-to-date stable performance.
   */
  initialize(apiKey: string) {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // Updated to use the specific gemini-flash-latest string
      this.model = this.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      console.log("✅ Coach Gemini Flash Latest initialized.");
    } catch (error) {
      console.error("❌ Initialization Error:", error);
    }
  }

  /**
   * Generates a technical tip for the 'POOL' home page.
   */
  async getDailyTip(): Promise<string> {
    if (!this.model) return "Keep your core tight and your gaze down.";
    
    const prompt = "You are an elite swim coach. Give one short, punchy technical tip (max 2 sentences) for a swimmer today. Focus on stroke mechanics, mindset, or recovery.";
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("Tip Error:", error);
      return "Focus on the finish of your stroke today. Every centimeter counts.";
    }
  }

  /**
   * Generates a professional swimming workout session.
   */
  async generateWorkout(level: string, goal: string, duration: string): Promise<string> {
    if (!this.model) return "Coach is still grabbing his whistle. Please wait...";

    const prompt = `
      You are "Coach Gemini," an elite Olympic-level swimming coach. 
      Generate a professional swimming workout for a ${level} swimmer.
      Goal: ${goal}
      Available Time: ${duration} minutes

      STRUCTURE:
      1. WARM-UP (15%): Mobility focus.
      2. PRE-SET (15%): Technical drills for ${goal}.
      3. MAIN SET (60%): High-intensity work.
      4. COOL DOWN (10%): Recovery.

      Use professional terminology and be motivational.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error("❌ Gemini API Error:", error);
      
      if (error.message?.includes("429")) {
        return "⚠️ Quota Reached. Coach is taking a break. Try again shortly.";
      }
      
      return `⚠️ Engine Error: ${error.message}. (Model: gemini-flash-latest)`;
    }
  }
}