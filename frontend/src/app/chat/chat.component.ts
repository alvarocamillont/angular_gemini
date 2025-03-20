import { Component, inject, model, signal } from '@angular/core';
import { PromptService } from '../prompt.service';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
content: string;
isUser: boolean;
}

@Component({
selector: 'app-chat',
imports: [FormsModule],
templateUrl: './chat.component.html',
styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private promptService = inject(PromptService);
  newMessage = model('');

  messages = signal([{} as ChatMessage])

  sendMessage() {

    if (this.newMessage().trim() === '') return;

    this.messages.update((messages)=>[...messages, {content: this.newMessage(), isUser: true}]);

    this.promptService.generateText(this.newMessage()).subscribe((response) => {
      this.messages.update((messages) => [
        ...messages,
        { content: response.text, isUser: false },
      ]);
    });

    this.newMessage.set('');

  }

}
