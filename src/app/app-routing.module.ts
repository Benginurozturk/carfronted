import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './components/pages/car-page/car-page.component';
import { CarsPageComponent } from './components/pages/cars-page/cars-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/heckout-page.component';

import { CustomersComponent } from './components/pages/customers/customers.component';

import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { RentalsComponent } from './components/pages/rentals/rentals.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  {
    path: 'brand/:brandName',
    pathMatch: 'full',
    component: HomepageComponent,
  },
  {
    path: 'cars',
    pathMatch: 'full',
    component: CarsPageComponent,
  },
  {
    path: 'car/:carId',
    pathMatch: 'full',
    component: CarPageComponent,
  },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'customers', component: CustomersComponent }, // Test
  { path: 'rentals', component: RentalsComponent }, // Test
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}