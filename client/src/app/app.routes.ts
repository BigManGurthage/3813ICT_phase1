import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ChatComponent } from './chat/chat.component';
import { AccountComponent } from './account/account.component'; // Import the AccountComponent

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'super-admin', component: SuperAdminComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'account', component: AccountComponent }, // Add the account route
];

// Export the routes so they can be used in your main application file
export const routing = RouterModule.forRoot(routes);
