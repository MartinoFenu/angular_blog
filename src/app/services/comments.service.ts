import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, throwError, Subject } from 'rxjs';
import { map, take, exhaustMap, catchError, tap } from 'rxjs/operators';

import { Comment, CommentInList } from '../models/comment.model';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable( { providedIn: 'root' } )
export class CommentsService {

  private commentsInPost: Comment[] = [];
  commentsChanged = new Subject<{}>();

  constructor( 
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) { }

  fetchCommentsList( postId: number ) {
    return this.http
      .get< Comment[] >(
        environment.API_BASE_URL + '/posts/' + 
        postId + 
        '/comments'
      );
  }

  fetchComments( postId: number ) {
    //the name property is more a title than a person name
    //so a random name is picked from /user endpoint
    return forkJoin([
      this.fetchCommentsList( postId ),
      this.userService.fetchUsers()
    ]).pipe(
      catchError( errorRes => {
        let errorMsg = errorRes;
        return throwError(errorMsg);
      }),
      map( ([ comments, users ]) => {
        const commentsWithAuthor: CommentInList[] = [];
        comments.forEach( commentEl => {
          let randomNumber = Math.floor(Math.random() * Math.floor(users.length));
          commentsWithAuthor.push({
            ...commentEl,
            username: users[randomNumber].name
          })
        })
        return commentsWithAuthor;
      })
    )
  }

  postNewComment( formData: { body: string, postId: number } ) {
    return this.http.post(
      environment.API_BASE_URL + '/posts/',
      {
        postId: formData.postId,
        body: formData.body
      }
    ).pipe(
      catchError( errorRes => {
        return throwError(errorRes);
      })
    )
  }
}