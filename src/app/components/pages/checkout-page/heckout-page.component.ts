import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDateCalculateDto } from 'src/app/models/carDateCalculateDto';
import { Rental } from 'src/app/models/rental';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/userservice';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  paymentSuccessfull!: boolean;
  customer:UserDetailDto;
  car:Car
  isChecked:boolean;
  paymentForm:FormGroup;
  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private creditCardService:CreditCardService
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
    this.getCarDetail()
    this.getCustomerDetail()
    console.log(this.customer)
    // if (!this.rentalService.rentalCheckout) this.router.navigateByUrl('404');
  }
  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      nameSurname:["",Validators.required],
      cardNumber:["",Validators.required],
      expMonth:["",Validators.required],
      expYear:["",Validators.required],
      cvc:["",Validators.required],

    })
  }

  getTotalPrice() {
    let calculateModel : CarDateCalculateDto={
      carId :1,
      rentDate : this.rental.rentStartDate,
      returnDate : this.rental.rentEndDate
    };
    this.carService.getCarTotalPrice(calculateModel).subscribe((response) => {
      this.totalPrice = response.data;
    });
  }
  
  SaveCard() {
    if (this.isChecked == true) {
      let cardModel = Object.assign(
        { customerId: Number(localStorage.getItem('customerId')) },
        this.paymentForm.value
      );
      console.log(cardModel);
      this.creditCardService.saveCard(cardModel).subscribe(
        (response) => {
          this.toastr.success(response.message);
        },
        (responseError) => {
          this.toastr.error(
            responseError.error.message,
            'Kart Kaydedilemedi'
          );
        }
      );
    }
  }
  getRentalById(id: number) {
    this.rentalService.getById(id).subscribe((response) => {
      this.rental = response.data;
      this.getTotalPrice();
    });
  }

  getCustomerDetail(){
    this.userService.getUserDetailByEmail(localStorage.getItem("email")).subscribe(response =>{
       this.customer = response.data
      
    })
  }

  getCarDetail(){
    this.carService.getCarById(this.rental?.carID).subscribe(response => {
      this.car = response.data
    })
  }

    payment() 
    {
    if(parseInt(localStorage.getItem("userFindex"))>=parseInt(localStorage.getItem("findex"))){
      this.paymentService.payment().subscribe(
        (response) => {
          this.SaveCard();
          this.paymentSuccessfull = true;
          this.toastr.success(response.message);
        },
        (error) => {
          this.paymentSuccessfull = false;
          this.toastr.error(error.error.message);
        }
      );
    }else{
      this.toastr.error("findeks skoru yeterli değil")
    }
  }

  
}