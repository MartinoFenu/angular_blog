import { UrlHandlingStrategy } from '@angular/router';

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
};

export interface PostInView extends Post {
  authorName?: string;
  postImage: {
    url: URL,
    title: string
  };
}