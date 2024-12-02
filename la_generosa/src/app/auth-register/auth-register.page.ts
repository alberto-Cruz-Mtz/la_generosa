import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { eye, lockClosed } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Response } from '../auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.page.html',
  styleUrls: ['./auth-register.page.scss'],
})
export class AuthRegisterPage implements OnInit {
  message = '';
  error = false;
  myForm: FormGroup;
  typeInput = 'password';
  icon = 'eye';
  user = new AuthService();
  constructor(private fb: FormBuilder, private route: Router) {
    addIcons({ eye, lockClosed });
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
    this.icon = this.icon === 'eye' ? 'eye-off' : 'eye';
  }

  loginF() {
    this.user.login('admin@demo.com', 'admin');
  }

  onSubmit() {
    const username = this.myForm.get('email')?.value;
    const password = this.myForm.get('password')?.value;

    this.user.register(username, password).then((res) => {
      const data = res as Response;
      console.log(data.message);
      if (data.status === 201) {
        this.route.navigate([`/hello/${username}`]);
        return;
      }
      this.error = true;
      this.message = data.message;
      return;
    });
  }

  ngOnInit(): void {}
}
