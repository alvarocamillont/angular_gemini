import { Component, inject, Signal, signal } from '@angular/core';
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
  newMessage = '';

  messages = signal([{} as ChatMessage])

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.messages.update((messages)=>[...messages, {content: this.newMessage, isUser: true}]);

    this.promptService.generateText(this.newMessage).subscribe((response) => {
      this.messages.update((messages) => [
        ...messages,
        { content: response.text, isUser: false },
      ]);
    });

    this.newMessage = '';
  }

}
