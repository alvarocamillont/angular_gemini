import { Module } from '@nestjs/common';
import { PromptService } from './prompt/prompt.service';
import { PromptController } from './prompt/prompt.controller';

@Module({
  providers: [PromptService],
  controllers: [PromptController]
})
export class PromptModule {}
