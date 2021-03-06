import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit-form',
  templateUrl: './car-edit-form.component.html',
  styleUrls: ['./car-edit-form.component.scss'],
})
export class CarEditFormComponent implements OnInit {
  car!: Car;
  carDataLoaded: boolean = false;
  brands: Brand[] = [];
  colors: Color[] = [];
  carImages: CarImage[] = [];
  carEditForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCarIdFromParam();
    this.getBrands();
    this.getColors();
  }

  getCarIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.getCarById(params['id']);
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.carDataLoaded = true;
      this.createCarForm();
      this.getCarImagesById(this.car.carID);
    });
  }

  getCarImagesById(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  createCarForm() {
    this.carEditForm = this.formBuilder.group({
      name: ["", Validators.required],
      brandId: [this.car.brandID, Validators.required],
      colorId: [this.car.colorID, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      description: [this.car.description, Validators.required],
      brandFilterText: [''],
      minFindeksScore: [''],
      colorFilterText: [''],
    });
  }

  getBrands() {
    this.brandService
      .getBrands()
      .subscribe((response) => (this.brands = response.data));
  }

  getColors() {
    this.colorService
      .getColors()
      .subscribe((response) => {
        this.colors = response.data
        console.log(this.colors)
      });
  }

  update() {
    if (!this.carEditForm.valid) {
      this.toastrService.warning('There are missing fields.');
      return;
    }

    let carModule: Car = { id: this.car.carID, ...this.carEditForm.value };
    this.carService.update(carModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'cars']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0)
          responseError.error.Errors.forEach((error: any) =>
            this.toastrService.error(error.ErrorMessage)
          );
      }
    );
  }

  delete() {
    //TODO : Refactor
    if (window.confirm('Are you sure to delete car?')) this.deleteCarImages();
  }

  deleteCar() {
    let carModule: Car = { id: this.car.carID, ...this.carEditForm.value };
    this.carService.delete(carModule).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['admin', 'cars']);
      },
      (responseError) => {
        if (responseError.error.Errors.lenght > 0)
          responseError.error.Errors.forEach((error: any) =>
            this.toastrService.error(error.ErrorMessage)
          );
      }
    );
  }

  deleteCarImages() {
    this.carImages.forEach((carImage, index) => {
      this.carImageService.delete(carImage).subscribe(
        (response) => {
          this.toastrService.success(
            carImage.imagePath.toString(),
            'Deleted car image successfully.'
          );

          if (index == this.carImages.length - 1) this.deleteCar();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0)
            responseError.error.Errors.forEach((error: any) => {
              this.toastrService.error(error.ErrorMessage);
            });
        }
      );
    });
  }
}