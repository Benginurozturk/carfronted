import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDateCalculateDto } from 'src/app/models/carDateCalculateDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  paymentSuccessfull!: boolean;

  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  rentalId!: number;
  rental!:Rental;
  totalPrice!:number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rentalId']) {
        this.rentalId = params['rentalId'];
        this.getRentalById(this.rentalId);
        
      }
    });
    // if (!this.rentalService.rentalCheckout) this.router.navigateByUrl('404');
  }

  getTotalPrice() {
    let calculateModel : CarDateCalculateDto={
      carId : this.rental.carID,
      rentDate : this.rental.rentStartDate,
      returnDate : this.rental.rentEndDate
    };
    this.carService.getCarTotalPrice(calculateModel).subscribe((response) => {
      this.totalPrice = response.data;
    });
  }
  
  getRentalById(id: number) {
    this.rentalService.getById(id).subscribe((response) => {
      console.log(response.data);
      this.rental = response.data;
      this.getTotalPrice();
    });
  }

  payment() {
    this.paymentService.test().subscribe(
      (response) => {
        this.paymentSuccessfull = true;
        this.toastr.success(response.message);
      },
      (error) => {
        this.paymentSuccessfull = false;
        this.toastr.error(error.error.message);
      }
    );
  }

  
}
