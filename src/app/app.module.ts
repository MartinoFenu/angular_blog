import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { AvatarModule } from 'ngx-avatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PostPageComponent } from './posts/post-page/post-page.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import { CommentItemComponent } from './comments/comments-list/comment-item/comment-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorIntercept } from './services/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PostPageComponent,
    PostListComponent,
    CommentsListComponent,
    PostItemComponent,
    CommentItemComponent,
    NewCommentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatListModule,
    AvatarModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
