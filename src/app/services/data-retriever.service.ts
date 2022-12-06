import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Product, PublisherInfo } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class DataRetrieverService {
  private productUrl = 'api/products'; // URL to web api
  private publisherUrl = 'api/publishers'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap((_) => console.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  /** GET publishers from the server */
  getPublishers(): Observable<PublisherInfo[]> {
    return this.http.get<PublisherInfo[]>(this.publisherUrl).pipe(
      tap((_) => console.log('fetched publishers')),
      catchError(this.handleError<PublisherInfo[]>('getPublishers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
