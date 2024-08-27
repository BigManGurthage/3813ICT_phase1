import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { AdminComponent } from './admin/admin.component';
//import { SuperAdminComponent } from './super-admin/super-admin.component';
//import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
 // { path: 'admin', component: AdminComponent },
 // { path: 'super-admin', component: SuperAdminComponent },
 // { path: 'chat', component: ChatComponent },
];

export const routing = RouterModule.forRoot(routes);
