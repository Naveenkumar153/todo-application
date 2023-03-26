import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConformPassword } from './conform-password/conform-password.component';
const routes: Routes = [
  { path:'',  pathMatch:'full', redirectTo:'/signup' },
  { path:'signin', component:SigninComponent },
  { path:'signup', component:SignupComponent },
  { path:'forgot-password', component:ForgotPasswordComponent },
  { path:'conform-password', component:ConformPassword },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
