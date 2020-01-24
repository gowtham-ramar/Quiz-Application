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
import { PackageListComponent } from './frontend/package-list/package-list.component';
import { QuizComponent } from './frontend/quiz/quiz.component';
import { QuizResolver } from './frontend/quiz/quiz.resolver';
import { SummaryComponent } from './frontend/summary/summary.component';

export const rootRouterConfig: Routes = [
  { path: '', component: PackageListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'question', component: QuestionsComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'class', component: ClassComponent },
  { path: 'chapter', component: ChapterComponent },
  { path: 'packages', component: PackageComponent },
    { path: 'package', component: PackageListComponent },
     { path: 'quiz/:id', component: QuizComponent,resolve:{data : QuizResolver}  },
       { path: 'summary/:id', component: SummaryComponent,resolve:{data : EditUserResolver}  },
  { path: 'details/:uid/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];