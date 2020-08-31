import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post, PostInView } from '../models/post.model';
import { UserService } from './users.service';
import { ImageService } from './images.service';
import { CommentsService } from './comments.service';
import { DataPlaceHolder } from '../utils/utils';

@Injectable( { providedIn: 'root' } )
export class PostsService {
  private placeHolders = new DataPlaceHolder();
  posts: PostInView[] = [];
  constructor( 
    private http: HttpClient,
    private userService: UserService,
    private imageService: ImageService,
    private commentsService: CommentsService,
  ) { }

  fetchPostList() {
    return this.http
      .get< Post[] >( environment.API_BASE_URL + '/posts');
  }

  fetchSinglePost( postId ) {
    return this.http
      .get< Post >( environment.API_BASE_URL + '/posts/' + postId );
  }

  fetchPost( postId ) {
    return forkJoin([
      this.fetchSinglePost( postId ),
      this.imageService.fetchImage( postId )
    ]).pipe(
      catchError( errorRes => {
        let errorMsg = errorRes;
        return throwError(errorMsg);
      }),
      map( ( [ post , image ] ) => {
      return {
        ...post,
        postImage: image
      }
    }))

  }

  fetchPosts() {
    return forkJoin([
      this.fetchPostList(),
      this.userService.fetchUsers(),
      this.imageService.fetchImages()
    ]).pipe(
      catchError( errorRes => {
        let errorMsg = errorRes;
        return throwError(errorMsg);
      }),
      map(([postList, userList, imageList]) => {
        let posts: PostInView[] = [];
        postList.forEach( ( postEl, i ) => {
          //if userId is not in the list of users 
          //use a custom name
          //if imageId does not match use a static placeholder
          posts.push( {
            ...postEl,
            authorName: this.placeHolders.getAuthorPlaceholder(),
            postImage: this.placeHolders.getImagePlaceholder()
          } );
          userList.forEach( userEl => {
            if(userEl.id === postEl.userId) posts[i].authorName = userEl.name;
          })
          imageList.forEach( imageEl => {
            if(imageEl.id === postEl.id) {
              posts[i].postImage.url = imageEl.thumbnailUrl;
              posts[i].postImage.title = imageEl.title;
            }
          })
        });
        return posts;
      })
    )
  }
}