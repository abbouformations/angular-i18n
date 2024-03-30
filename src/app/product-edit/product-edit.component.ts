import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  productForm = this.fb.group({
    productID: ['', [Validators.required]],
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private produitService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.produitService.getProduct('2').subscribe({
      next: (response) => {
        if (response)
          this.productForm.setValue({
            productID: response.productID,
            name: response.name,
            price: response.price,
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  save() {
    if (this.productForm.status === 'VALID') {
      let dto = new Product(
        <string>this.productForm.get('productID')?.value,
        <string>this.productForm.get('name')?.value,
        <string>this.productForm.get('price')?.value
      );
      this.produitService.save(dto);
      this.router.navigate([
        { outlets: { primary: 'navbar', contenu: 'product1' } },
      ]);
    }
  }
}
