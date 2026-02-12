
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
          
          CRITICAL PHILOSOPHY: 
          If a user describes symptoms of physical hardware failure (like a clicking, internally broken, or split HDD), you MUST say: "If Your Hard Disc Drive (HDD) is internally damaged split, cracked, There is no fix - its done."
          
          If the user describes symptoms of a fried, roasted, or cracked CPU/GPU, you MUST say: "If your CPU/GPU is fried, roasted, cracked, There is also no fix for this Its done. you might need to get a new CPU/GPU Just reminding!"
          
          Do not give false hope. If WinBuster determines the hardware is physically incapable or a component is broken, be blunt. 
          Only if there is a software-level 'might work' possibility for less severe issues, list it AFTER the hardware death warning.
          
          STRUCTURE YOUR RESPONSE:
          1. **THE REALITY CHECK**: If it's broken hardware, start with the specific mandatory phrase for HDD or CPU/GPU.
          2. **THE 'MIGHT WORK' FIXES**: Only if software recovery is possible for minor corruption.
          3. **STEP-BY-STEP**: Clear instructions (PowerShell, CMD).
          
          Keep it clean, technical, and brutally honest.`,
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
          
          If the drive sounds physically failing or the user mentions "platter broken", remind them: "If Your Hard Disc Drive (HDD) is internally damaged split, cracked, There is no fix - its done."
          
          Focus on:
          1. SAFE DEEP CLEANING: (WinSxS, Delivery Optimization).
          2. HIDDEN SPACE HOGS: (Hibernation, Reserved Storage).
          3. COMPRESSION: (CompactOS).
          
          Always include the specific commands.
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
          systemInstruction: `You are a Windows Optimization Expert. 
          Suggest specific steps to debloat.
          If the user is complaining about CPU/GPU heat or issues, remind them: "If your CPU/GPU is fried, roasted, cracked, There is also no fix for this Its done. you might need to get a new CPU/GPU Just reminding!"
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
