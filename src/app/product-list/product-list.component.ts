import { Product, PublisherInfo } from './../models/product.models';
import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { map } from 'rxjs/operators';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[] = [];

  constructor(private dataService: DataRetrieverService) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.products$ = this.retrieveProductsParallel();
    //uncomment to retrieve the products sequentially
    // this.products$ = this.retrieveProductsSeq();
  }

  private retrieveProductsParallel(): Observable<Product[]> {
    return forkJoin({
      products: this.dataService.getProducts(),
      publishers: this.dataService.getPublishers(),
    }).pipe(
      map((result) => {
        const publishers: PublisherInfo[] = result.publishers;
        const products: Product[] = result.products?.map((product) => {
          return {
            ...product,
            available: product.inStock,
            publisherInfo: this.publisherInfoModified(publishers, product),
          };
        });
        return products;
      })
    );
  }

  private retrieveProductsSeq(): Observable<Product[]> {
    return this.dataService.getProducts().pipe(
      switchMap((res) => {
        const bookId = res.map((res) => res.id);
        return this.dataService.getPublishersById(bookId).pipe(
          map((publishers) => {
            const products: Product[] = res.map((product) => {
              return {
                ...product,
                available: product.inStock,
                publisherInfo: this.publisherInfoModified(publishers, product),
              };
            });
            return products;
          })
        );
      })
    );
  }

  private publisherInfoModified(
    publishers: PublisherInfo[],
    product: Product
  ): Partial<PublisherInfo> {
    const publisherMatch = publishers?.find(
      (publisher) => publisher.id === product.id
    );
    if (!publisherMatch) return {};
    const { id, ...rest } = publisherMatch;
    return rest;
  }
}
