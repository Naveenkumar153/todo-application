import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth.routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConformPassword } from './conform-password/conform-password.component';
import { OnlyOneErrorPipe } from 'src/app/pipes/only-one-error-pipe';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ConformPassword,
    OnlyOneErrorPipe
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
