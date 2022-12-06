import { Product, PublisherInfo } from './../models/product.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { map, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject, tap, catchError } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  products: Product[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataRetrieverService) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.getProductsSubscription();
  }

  getProductDetails(): void {
    this.products$ = this.retrieveProducts();
  }

  private retrieveProducts(): Observable<Product[]> {
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

  getProductsSubscription(): void {
    this.dataService
      .getProducts()
      .pipe(
        takeUntil(this.destroy$),
        tap((products) => {
          const tempArray = products.map((product) => {
            return { ...product, available: product.inStock };
          });
          this.products = tempArray;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
