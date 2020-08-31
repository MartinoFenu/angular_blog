import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentInList } from '../../models/comment.model';
import { CommentsService } from 'src/app/services/comments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  isFetching = false;
  comments: CommentInList[] = [];
  commentSubscription: Subscription;
  error: string = null;

  constructor( 
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    this.commentSubscription = this.commentsService.commentsChanged
      .subscribe( ( comments: CommentInList ) => {
        this.comments.push(comments)
      });
    this.isFetching = true;
    this.commentsService.fetchComments( this.postId )
      .subscribe( comments => {
        this.isFetching = false;
        this.comments = comments;
      },
      errorMsg => {
        this.error = errorMsg;
        this.isFetching = false
      })
  }

  ngOnDestroy(): void {
    this.commentSubscription.unsubscribe()
  }
}
