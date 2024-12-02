import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from './user';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  message = '';
  error = false;
  myForm: FormGroup;
  typeInput = 'password';
  icon = 'eye';
  user = new AuthService();
  constructor(private fb: FormBuilder, private navCtrl: NavController) {
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

  onSubmit() {
    const username = this.myForm.get('email')?.value;
    const password = this.myForm.get('password')?.value;

    this.user.login(username, password).then((res) => {
      const data = res as Response;
      console.log(data.message);
      if (data.status === 200) {
        this.navCtrl.navigateForward(`/hello/${username}`);
        return;
      }
      this.error = true;
      this.message = data.message;
      return;
    });
  }

  ngOnInit() {}
}
