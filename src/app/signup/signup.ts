import { Component } from '@angular/core';
import axios from 'axios';
import { host } from '../../utils/userApi';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  // toggler: true = signup, false = login
  isSignup = true;

  // signup form model
  user = {
    name: '',
    email: '',
    password: '',
    about: ''
  };

  // login form model
  loginuser = {
    email: '',
    password: ''
  };

  constructor(private router: Router) { }

  toggleForm() {
    this.isSignup = !this.isSignup;
  }

  async signup() {
    try {
      const mutation = `
        mutation {
          userMutation {
            adduser(user: {
              name: "${this.user.name}",
              email: "${this.user.email}",
              password: "${this.user.password}",
              about: "${this.user.about}"
            }) {
              id
              name
              email
              about
            }
          }
        }
      `;

      const response = await axios.post(host, { query: mutation });
      const result = response.data.data.userMutation.adduser;

      if (result == null) {
        alert("the email already exists, try login or use another email");
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(result));
      this.router.navigate(["/chatpage"]).then(() => {
        alert(`Signup successful! Welcome ${result.name}`);
      })

    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  }

  async login() {
    try {
      const mutation = `
      mutation {
        userMutation {
          loginuser(email: "${this.loginuser.email}", password: "${this.loginuser.password}") {
            id
            name
            email
            about
          }
        }
      }
    `;

      const response = await axios.post(host, { query: mutation });
      console.log(response);

      const result = response.data.data.userMutation.loginuser;

      if (result == null) {
        alert("Login failed, check email and password");
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(result));

      this.router.navigate(["/chatpage"]);

      alert(`Login successful! Welcome ${result.name}`);

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  }

}
