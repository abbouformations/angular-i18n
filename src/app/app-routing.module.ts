import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmpListComponent } from './emp/emp-list/emp-list.component';
import { EmpCreateComponent } from './emp/emp-create/emp-create.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmpDetailComponent } from './emp/emp-detail/emp-detail.component';
import { EmpEditComponent } from './emp/emp-edit/emp-edit.component';
import { checkAuthGuard } from './guards/check-auth.guard';
import { checkAdminGuard } from './guards/check-admin.guard';
import { checkSaveGuard } from './guards/check-save.guard';
import { Product1Component } from './product1/product1.component';
import { Product2Component } from './product2/product2.component';
import { ProductListResolver } from './services/product-list.resolver';
import { adminGuard } from './guards/admin.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'navbar', component: NavbarComponent },
  {
    path: 'employees',
    canActivate: [checkAuthGuard],
    component: EmpListComponent,
    outlet: 'contenu',
  },
  {
    path: 'create',
    component: EmpCreateComponent,
    outlet: 'contenu',
    canActivate: [checkAdminGuard],
    canDeactivate: [checkSaveGuard],
  },
  { path: 'welcome', component: WelcomeComponent, outlet: 'contenu' },
  { path: 'logout', component: AuthComponent },
  { path: 'employees/:id', component: EmpEditComponent, outlet: 'contenu' },
  { path: 'delete/:id', component: EmpListComponent, outlet: 'contenu' },

  {
    path: 'product1',
    component: Product1Component,
    outlet: 'contenu',
    canActivateChild: [adminGuard],
    children: [
      {
        path: 'edit/:id',
        component: ProductEditComponent,
      },
    ],
  },

  {
    path: 'product2',
    component: Product2Component,
    resolve: { products: ProductListResolver },
    outlet: 'contenu',
    children: [
      {
        path: 'edit/:id',
        component: ProductEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
