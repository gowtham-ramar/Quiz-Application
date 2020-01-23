import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { QuestionsComponent } from './questions/questions.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'new', component: QuestionsComponent },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];