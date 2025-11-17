import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-service';
import { MessageService } from '../message-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-user-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './all-user-page.html',
  styleUrls: ['./all-user-page.css'],
})
export class AllUserPage implements OnInit, OnDestroy {
  users: any[] = [];
  selectedUser: any = null;
  messages: any[] = [];
  newMessage: string = '';
  pollingInterval: any; 

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  getEmailPrefix(email: string): string {
    return email.split('@')[0];
  }

  async selectUser(user: any) {
    this.selectedUser = user;
    console.log('Selected user:', user);

    // initial load
    await this.loadMessages();

    // clear any previous polling
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

  
    this.pollingInterval = setInterval(async () => {
      if (this.selectedUser) {
        this.messages = await this.messageService.getAllMessages(this.selectedUser.id);
      }
    }, 3000);
  }

  async loadMessages() {
    if (!this.selectedUser) return;
    this.messages = await this.messageService.getAllMessages(this.selectedUser.id);
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;

    const sent = await this.messageService.sendMessage(
      this.selectedUser.id,
      this.newMessage
    );

    if (sent) {
      this.messages.push(sent); // update instantly
      this.newMessage = '';     // clear input
    }
  }

  ngOnDestroy() {
   
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
}
