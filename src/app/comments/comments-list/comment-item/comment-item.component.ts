import { Component, OnInit, Input } from '@angular/core';

import { CommentInList } from '../../../models/comment.model'

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: CommentInList;

  constructor() { }

  ngOnInit(): void {
  }

}