import { Injectable } from '@angular/core';
import axios from 'axios';
import { host } from '../utils/userApi';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async getAllUsers() {
    try {
      const query = `
        query {
          userQuery {
            getalluser {
              id
              name
              email
              about
            }
          }
        }
      `;

      const response = await axios.post(host, { query });
      // Extract result
      const result = response.data.data.userQuery.getalluser;
      return result;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }
}
