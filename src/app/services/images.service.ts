import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Image } from '../models/image.model';
import { DataPlaceHolder } from '../utils/utils';

@Injectable( { providedIn: 'root' } )
export class ImageService {
  private placeHolders = new DataPlaceHolder();

  constructor( private http: HttpClient ) { }

  fetchImage( postId ) {
    return this.fetchImages()
      .pipe( 
        map( images => {
          const result = images.find( imageEl => ( imageEl.id === +postId ) );
          if( result ) return {
            url: result.url,
            title: result.title
          };
          else return this.placeHolders.getImagePlaceholder();
        })
    );
  }
  
  fetchImages() {
    return this.http
      .get< Image[] >(
        environment.API_BASE_URL + '/photos'
      );
  }
}