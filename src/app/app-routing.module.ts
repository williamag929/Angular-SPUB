import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { TaskComponent } from './components/task/task.component';
import { TaskIndexComponent } from './components/task-index/task-index.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { SectorComponent } from './components/sector/sector.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'task-index', component: TaskIndexComponent },
  { path: 'task', component: TaskComponent },
  { path: 'contacts', component: ContactComponent},
  { path: 'sectors', component: SectorComponent},
  { path: 'contact-dialog', component: ContactDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
