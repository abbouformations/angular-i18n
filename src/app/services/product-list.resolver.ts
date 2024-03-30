/*import { ResolveFn } from '@angular/router';

export const productListResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};*/

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root',
})
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    console.log('ProductListResover is called');
    return this.productService.getProducts();
  }
}
