import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuard } from './guard/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'', loadChildren:() => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { 
    path:'home/:id', 
    component:TodoComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component:NotfoundComponent,
  }
];

@NgModule({
  imports: [AuthModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
