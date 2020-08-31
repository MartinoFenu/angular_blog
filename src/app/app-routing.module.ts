import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostPageComponent } from './posts/post-page/post-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'posts', component: PostListComponent, canActivate:[ AuthGuard ] },
  { path: 'posts/:id', component: PostPageComponent, canActivate:[ AuthGuard ] },
  { path: 'not-found', component: PageNotFoundComponent, canActivate:[ AuthGuard ] },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
