import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [ConfigModule.forRoot(), PromptModule],
})
export class AppModule {}
