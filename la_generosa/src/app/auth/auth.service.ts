import { Injectable } from '@angular/core';
import { users } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    users;
  }

  async login(username: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      return data;
    } catch (error) {}
  }

  async register(username: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      return data;
    } catch (error) {}
  }
}
