import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostInView } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  fetchedPosts: PostInView[] = [];
  isFetching = false;
  error: string = null;

  constructor( 
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe( 
        posts => {
          this.isFetching = false;
          this.fetchedPosts = posts;
        },
        errorMsg => {
          //errorMsg got from auth.service.ts
          this.error = errorMsg;
          this.isFetching = false;
        }
      );
  }

  onLogout() {
    this.authService.logout();
  }

  onPostItemClick( postId ) {
    this.router.navigate([postId], { relativeTo: this.route });
  }
}