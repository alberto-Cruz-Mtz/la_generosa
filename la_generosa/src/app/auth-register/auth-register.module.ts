import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthRegisterPageRoutingModule } from './auth-register-routing.module';

import { AuthRegisterPage } from './auth-register.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRegisterPageRoutingModule,
  ],
  declarations: [AuthRegisterPage],
})
export class AuthRegisterPageModule {}
