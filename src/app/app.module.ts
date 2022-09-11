import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { SuscriptionComponent } from './components/suscription/suscription.component';
import { ZoneComponent } from './components/zone/zone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskComponent } from './components/task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
import { TaskIndexComponent } from './components/task-index/task-index.component';
import { MaterialModule } from './core/material.module';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormTemplateComponent } from './components/dynamic-form-template/dynamic-form-template.component';
import { SectorComponent } from './components/sector/sector.component';
import { SectorDialogComponent } from './components/sector-dialog/sector-dialog.component';
import { SectorDynamicFormComponent } from './components/sector-dynamic-form/sector-dynamic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    SuscriptionComponent,
    ZoneComponent,
    TaskComponent,
    AppComponent,
    TaskDialogComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TaskIndexComponent,
    ContactDialogComponent,
    DynamicFormComponent,
    DynamicFormTemplateComponent,
    SectorComponent,
    SectorDialogComponent,
    SectorDynamicFormComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
