import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { UserComponent } from './user/user.component';
import { RoleGuard } from './services/role.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { LogoutComponent } from './logout/logout.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChannelComponent } from './channel/channel.component';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'super-admin', component: SuperAdminComponent, canActivate: [RoleGuard], data: { role: 'Super Admin' } },
  { path: 'group-admin', component: GroupAdminComponent, canActivate: [RoleGuard], data: { role: 'Group Admin' } },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { role: 'User' } },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'channels', component: ChannelComponent }
];
