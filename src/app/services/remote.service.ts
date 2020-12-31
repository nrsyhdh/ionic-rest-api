import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RemoteService {
  
  getApiUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http : HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred: ', error.error.message);
    }
    else{
      console.error(
        `Backend returned code ${error.status}, `+
        `body was: ${error.error}`);
    }
    return throwError(
      `Something bad happened; please try again later`
    );
  }

  

  getPosts(): Observable<Post>{
    return this.http.get<Post>(this.getApiUrl)
                    .pipe(
                      retry(2),
                      catchError(this.handleError)
                    )
  }

  getOnePost(id): Observable<Post>{
    return this.http.get<Post>(this.getApiUrl + '/' + id)
                    .pipe(retry(2), catchError(this.handleError))
  }
}
