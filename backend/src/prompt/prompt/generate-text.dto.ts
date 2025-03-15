import { ApiProperty } from '@nestjs/swagger';

export class GenerateTextDto {
  @ApiProperty({
    name: 'prompt',
    description: 'Texto da pergunta',
    type: 'string',
    required: true,
  })
  prompt: string;
}
