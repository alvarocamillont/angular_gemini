import { Component, inject } from '@angular/core';
import { PromptService } from '../prompt.service';

interface ChatMessage {
content: string;
isUser: boolean;
}

@Component({
selector: 'app-chat',
imports: [],
templateUrl: './chat.component.html',
styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private promptService = inject(PromptService);
  messages: ChatMessage[] = [
      { content: 'Olá! Como posso ajudar?', isUser: false },
      { content: 'Como funciona?', isUser: true },
  ];
}
