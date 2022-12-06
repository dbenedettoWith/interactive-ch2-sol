import { Product, PublisherInfo } from './../models/product.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { map, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, Subject, tap } from 'rxjs';

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
    this.products$ = forkJoin({
      products: this.dataService.getProducts(),
      publishers: this.dataService.getPublishers(),
    }).pipe(
      map((result) => {
        const publishers: PublisherInfo[] = result.publishers;
        const products: Product[] = result.products?.map((product) => {
          return { ...product, available: product.inStock, 
          publisherInfo:  this.publisherInfoModified(publishers, product)}
          
        });

        return products;
      })
    );
  }

  publisherInfoModified(publishers: PublisherInfo[], product: Product): Partial<PublisherInfo> {
    const publisherMatch = publishers?.find(publisher => publisher.id === product.id)
    const {id, ... rest} = publisherMatch;
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
