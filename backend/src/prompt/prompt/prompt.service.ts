import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenAiResponse } from './interfaces/gen-ai-response.interface';

@Injectable()
export class PromptService {
  private readonly apiKey: string;
  private genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }
  async generateText(prompt: string): Promise<GenAiResponse> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return { text };
  }
}
