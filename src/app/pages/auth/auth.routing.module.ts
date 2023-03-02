import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path:'',  pathMatch:'full', redirectTo:'/signup' },
  { path:'signin', component:SigninComponent },
  { path:'signup', component:SignupComponent },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
