import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { TodoComponent } from './components/todo/todo.component';
import { OtpSixDigitComponent } from './components/otp/otp.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ShowhidepasswordDirective } from './directive/showhidepassword.directive';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    OtpSixDigitComponent,
    NotfoundComponent,
    ShowhidepasswordDirective,
    LoaderComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxOtpInputModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true },
    { provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true },
    { provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
