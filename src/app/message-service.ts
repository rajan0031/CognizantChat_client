import { Injectable } from '@angular/core';
import axios from 'axios';
import { host } from '../utils/userApi';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() { }

  async getAllMessages(receiverId: number) {
    try {
      // get logged-in user from localStorage
      const authUser = localStorage.getItem('authUser');
      if (!authUser) {
        throw new Error('No logged-in user found');
      }

      const sender = JSON.parse(authUser);
      const senderId = sender.id; // ✅ senderId from localStorage

      const query = `
        query {
          messageQuery {
            getAllMessage(senderId: ${senderId}, receiverId: ${receiverId}) {
              id
              textMessage
            }
          }
        }
      `;

      const response = await axios.post(host, { query });
      return response.data.data.messageQuery.getAllMessage;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw error;
    }
  }


  async sendMessage(receiverId: number, textMessage: string) {
    try {
      const authUser = localStorage.getItem('authUser');
      if (!authUser) throw new Error('No logged-in user found');

      const sender = JSON.parse(authUser);
      const senderId = sender.id;

      const mutation = `
        mutation {
          messageMutation {
            addMessage(message: {
              senderid: ${senderId},
              receiverid: ${receiverId},
              textmessage: "${textMessage}"
            }) {
              id
              textMessage
            }
          }
        }
      `;

      const response = await axios.post(host, { query: mutation });
      return response.data.data.messageMutation.addMessage;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

}
