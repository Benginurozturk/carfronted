import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';
import { RentalAddDto } from 'src/app/models/rentalAddDto';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss'],
})
export class CarPageComponent implements OnInit {
  car!: Car;
  brand!: Brand;
  color!: Color;
  carImages!: CarImage[];
  DateTimeNow: Date = new Date();
  rentStartDate: Date = this.DateTimeNow;
  rentEndDate: Date = this.DateTimeNow;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarById(params['carId']);
      this.carId = params['carId'];
    });
  }

  carId!: number;
  onlyImageApiUrl:string=environment.apiUrl.replace('api','');
  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      
      this.getColorById(this.car.colorID);
      this.getCarImagesById(this.car.carID);
      this.getBrandById(this.car.brandID);
      localStorage.setItem("findex", this.car.minFindeksScore.toString())
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
    });
  }

  getColorById(colorId: number) {
    this.colorService.getBrandById(colorId).subscribe((response) => {
      this.color = response.data;
    });
  }

  getCarImagesById(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      console.log(this.carImages);
    });
  }

  isActiveCarousel(carImageIndex: number): string {
    return carImageIndex == 0 ? 'active' : '';
  }

  getCarImageUrl(carImageId: number): string {
    return this.carImageService.getCarImageUrl(carImageId);
  }

  rentCar() {
    let rentalAddDto: RentalAddDto = new RentalAddDto();
    rentalAddDto.carId = this.carId.toString();
    rentalAddDto.customerId = 1003;
    rentalAddDto.rentStartDate = new Date(this.rentStartDate);
    rentalAddDto.rentEndDate = new Date(this.rentEndDate);
    rentalAddDto.returnDate = undefined;

    let rental: Rental = {
      carID: this.carId,
      customerID: 1003, // Test
      rentStartDate: new Date(this.rentStartDate),
      rentEndDate: new Date(this.rentEndDate),
      returnDate: undefined,
    };

    let rentalId:number;

    this.rentalService.addRental(rentalAddDto).subscribe(
      (p) => {
        rentalId = p.data;
        this.toastr.info('You are redirected to payment page.');
        this.rentalService.rentalCheckout = rental;
        this.router.navigateByUrl('/checkout/'+ rentalId);
      },
      (error) => {
        if (error.status == 500)
          this.toastr.error('Ops, there seems to be a problem.');
        else this.toastr.error(error.error.message);
      }
    );

    // this.rentalService.isRentable(rental).subscribe(
    //   (response) => {
    //     this.toastr.info('You are redirected to payment page.');
    //     this.rentalService.rentalCheckout = rental;
    //     this.router.navigateByUrl('/checkout');
    //   },
    //   (error) => {
    //     if (error.status == 500)
    //       this.toastr.error('Ops, there seems to be a problem.');
    //     else this.toastr.error(error.error.message);
    //   }
    // );
  }
}
