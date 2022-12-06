import { Product, PublisherInfo } from './models/product.models';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      { id: 'sksadere', name: 'Dr. Nice', inStock: true },
      { id: 'dadasd', name: 'Bombasto', inStock: true },
      { id: 'rtsds', name: 'Celeritas', inStock: true },
      { id: 'lklsdv', name: 'Magneta', inStock: true },
      { id: 'eosum', name: 'RubberMan', inStock: true },
      { id: 'lorusm', name: 'Dynama', inStock: false },
      { id: 'loasdmr', name: 'Dr. IQ', inStock: true },
      { id: 'epsomi', name: 'Magma', inStock: true },
      { id: 'ldot', name: 'Tornado', inStock: false },
    ];

    const publishers: PublisherInfo[] = [
      { id: 'sksadere', publisherName: 'Penguin', phoneNumber: '425-123-5998' },
      { id: 'dadasd', phoneNumber: '425-123-5938', publisherName: 'Penguin' },
      { id: 'rtsds', phoneNumber: '425-123-5348', publisherName: 'Lion' },
      { id: 'lklsdv', phoneNumber: '425-234-5998', publisherName: 'Daily' },
      { id: 'eosum', phoneNumber: '425-564-5998', publisherName: 'NY Penguin' },
      { id: 'lorusm', phoneNumber: '425-766-5998', publisherName: 'Withum' },
      { id: 'loasdmr', phoneNumber: '425-873-5998', publisherName: 'Tiger' },
      { id: 'epsomi', phoneNumber: '425-049-5998', publisherName: 'Tiger' },
      { id: 'ldot', phoneNumber: '425-405-5998', publisherName: 'Penguin' },
    ];
    return { products, publishers };
  }
}
