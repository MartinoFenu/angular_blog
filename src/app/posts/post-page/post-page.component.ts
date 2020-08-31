import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { PostInView } from '../../models/post.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  postId: number = this.route.snapshot.params['id'];
  post: PostInView = {
    title: '',
    userId: null,
    id: null,
    body: '',
    postImage: {
      url: null,
      title: ''
    }
  };
  isFetching = false;

  constructor( 
    private route: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.postService
      .fetchPost( this.postId )
      .subscribe(
        post => {
          this.isFetching = false;
          this.post = post
        }
      );
  }
}
