import { Controller, Post, Body } from '@nestjs/common';

import { PromptService } from './prompt.service';
import { GenAiResponse } from './interfaces/gen-ai-response.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GenerateTextDto } from './dto/generate-text.dto';

@ApiTags('prompt')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  @ApiOperation({ summary: 'Generate text with Gemini' })
  async generateText(
    @Body() generateTextDto: GenerateTextDto,
  ): Promise<GenAiResponse> {
    return this.promptService.generateText(generateTextDto.prompt);
  }
}
