
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async explainBloatware(itemTitle: string, description: string, winVersion: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze '${itemTitle}' on Windows ${winVersion}. 
        Context: ${description}`,
        config: {
          systemInstruction: `You are a specialized Windows System Architect. 
          Provide a critical but fair analysis of the given Windows component.
          
          STRUCTURE YOUR RESPONSE:
          1. **THE BLOAT CASE**: Explain exactly how it wastes storage, RAM, or battery, and any privacy/telemetry implications.
          2. **THE NECESSITY CASE**: Explain EXACTLY what functions, apps, or Windows features will stop working if this is removed. Be very specific (e.g., "Deleting this breaks Windows Search indexing").
          3. **STORAGE IMPACT**: Estimate the potential space savings (e.g., "500MB" or "Massive: 10GB+").
          4. **FINAL VERDICT**: Rate as [EXPENDABLE], [RECOMMENDED REMOVAL], or [KEEP FOR STABILITY].
          
          Style: Concise, technical, objective. No fluff. Use Markdown.`,
          temperature: 0.3,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini bloatware explanation error:", error);
      return "Unable to generate analysis at this time. Please try again.";
    }
  }

  async troubleshootProblem(problem: string, winVersion: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Troubleshoot this Windows ${winVersion} problem: ${problem}`,
        config: {
          systemInstruction: `You are a senior Windows Support Engineer. 
          A user is describing a specific problem. 
          Your goal is to provide a "Brain-Saving" fix: easy, safe, and effective.
          
          STRUCTURE YOUR RESPONSE:
          1. **THE DIAGNOSIS**: Briefly explain what is likely happening.
          2. **THE SAFE FIX**: Provide the most effective and safest way to fix it.
          3. **STEP-BY-STEP**: Clear instructions (PowerShell, Registry, or Settings).
          4. **PREVENTION**: One tip to stop it from happening again.
          
          If the problem is complex, always suggest a System Restore Point.
          Keep it clean, technical, and helpful.`,
          temperature: 0.6,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini troubleshooting error:", error);
      return "I couldn't analyze the problem. Please describe it differently or try again.";
    }
  }

  async getStorageAudit(winVersion: string, userDetails?: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a masterclass on reclaiming storage on Windows ${winVersion}. ${userDetails ? `User Context: ${userDetails}` : ''}`,
        config: {
          systemInstruction: `You are the world's leading storage optimization expert for Windows. 
          You provide "brain-thanking" advice—meaning it's so clever, safe, and effective that the user feels a sense of relief.
          
          Focus on:
          1. SAFE DEEP CLEANING: (e.g., Delivery Optimization files, Driver packages via DISM, WinSxS cleanup).
          2. HIDDEN SPACE HOGS: (e.g., Reserved Storage, old Windows installations, hibernation files).
          3. COMPRESSION: (e.g., CompactOS, LZX compression for games/apps).
          4. DATA MANAGEMENT: (e.g., Symbolic links for moving folders to other drives without breaking apps).
          
          Always include the specific commands (PowerShell/CMD).
          Categorize by: [VERY EASY], [MODERATE], [ADVANCED].
          Keep it highly technical but extremely safe.`,
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini storage audit error:", error);
      return "I couldn't generate a storage audit. Please check your connection.";
    }
  }

  async getOptimizationAdvice(query: string, winVersion: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am using Windows ${winVersion}. ${query}`,
        config: {
          systemInstruction: `You are a Windows Optimization Expert focused on performance and storage. 
          Suggest specific steps to debloat and save space. 
          Provide PowerShell or CMD commands where applicable.
          Focus on:
          - Massive storage savings (WinSxS, temp files, delivery optimization).
          - Privacy fixes.
          - Disabling background services.
          Always recommend a Restore Point first.`,
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini optimization advice error:", error);
      return "I couldn't fetch advice at the moment. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
