
import { Component, OnInit, Input } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  @Input() carDetail!: CarDetail;
  carImage!: CarImage;
  carImageUrl: string = '';

  constructor(private carImageService: CarImageService) {}

  ngOnInit(): void {
    if (this.carDetail){
      this.getCarImage();
    }
  }

  getCarImage() {
  
    this.carImageService
      .getImagesByCarId(this.carDetail.carID)
      .subscribe((response) => {
      
        this.carImage = response.data[0];
        this.carImageUrl = "https://localhost:44306"+response.data[0].imagePath
      });
  }
}