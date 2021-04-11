import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { AuthService } from 'src/app/services/authservice';

import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletPageComponent implements OnInit {
  userDetail!: UserDetailDto;
  creditCards!: CreditCard[];
  dataLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    //this.getUserDetailFromStore();
    this.getAllCreditCards();
  }
/*
  getUserDetailFromStore() {
    this.authService.userDetail$.subscribe((userDetail) => {
      if (userDetail) {
        this.userDetail = userDetail;
        this.dataLoaded = true;
        this.getAllCreditCards();
      }
    });
  }*/

  getAllCreditCards() {
    this.creditCardService
      .getAllByCustomerId(parseInt(localStorage.getItem("customerId")))
      .subscribe((response) => {
        this.creditCards = response.data;
        this.dataLoaded = true;
      });
  }
  
  deleteCreditCard(creditCard: CreditCard) {
    if (confirm('Are you sure to delete credit card?'))
      this.creditCardService.delete(creditCard).subscribe((response) => {
        this.toastrService.success(response.message);
        this.creditCards = this.creditCards.filter(
          (c) => c.id !== creditCard.id
        );
      });
    }
}