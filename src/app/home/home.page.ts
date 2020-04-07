import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages: Message[];
  constructor(private data: DataService) {}

  ionViewWillEnter() {
    this.messages = this.data.getMessages();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    const message = this.messages.splice(ev.detail.from, 1)[0];
    this.messages.splice(ev.detail.to, 0, message);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  edit(message: Message) {
    const newMessage = {
      fromName: 'Edited',
      subject: new Date().toLocaleDateString(),
      date: new Date().toLocaleDateString(),
      id: message.id,
      read: true
    };
    const index = this.messages.findIndex((elem) => elem.id === newMessage.id);
    console.debug(index);
    this.messages[index] = newMessage;

    console.debug(this.messages);
  }

}
