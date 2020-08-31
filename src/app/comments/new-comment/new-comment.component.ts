import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() postId: number;
  isLoading = false;
  error: string = null;

  constructor(
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit( form: NgForm) {
    if( !form.valid ) return;
    this.isLoading = false;
    this.commentsService.postNewComment( {
      body: form.value.comment,
      postId: this.postId
    } ).subscribe( 
      comment => {
        //firebase auth service won't let set a username
        //without accessing database to make the user consistent
        //the user is for now hardcoded
        //mostly because the jsonplaceholder API don't hold a username for the comments endpoint
        this.isLoading = false;
        form.reset();
        this.commentsService.commentsChanged.next({
          ...comment,
          username: 'Authenticated User'
        });
      },
      errorMsg => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    )
  }

}
