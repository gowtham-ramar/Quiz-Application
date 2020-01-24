import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { QuestionsComponent } from './questions/questions.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { SubjectComponent } from './Master/subject/subject.component';
import { ChapterComponent } from './Master/chapter/chapter.component';
import { ClassComponent } from './Master/class/class.component';
import { PackageComponent } from './packages/packages.component';


export const rootRouterConfig: Routes = [
  { path: '', component: PackageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'question', component: QuestionsComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'class', component: ClassComponent },
  { path: 'chapter', component: ChapterComponent },
  { path: 'packages', component: PackageComponent },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];