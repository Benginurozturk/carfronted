import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Findeks } from 'src/app/models/findeks';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserDetailUpdateModelDto } from 'src/app/models/userDetailUpdateModelDto';
import { AuthService } from 'src/app/services/authservice';

import { FindeksService } from 'src/app/services/findeks.service';
import { UserService } from 'src/app/services/userservice';


@Component({
  selector: 'app-account-page',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  userDetail$: Observable<UserDetailDto | undefined> = this.authService
    .userDetail$;
  userDetail?: UserDetailDto;
  findeks!: Findeks;
  currentPasswordHidden: boolean = true;
  newPasswordHidden: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private findeksService: FindeksService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserDetailsFromStore();
    this.createAccountFrom();
    
  }

  getUserDetailsFromStore() {
    this.authService.userDetail$.pipe(first()).subscribe((userDetail) => {
      if (!userDetail) return;

      this.userDetail = userDetail;
      this.createAccountFrom();
      this.getFindeksByCustomerId(userDetail.customerId);
    });
  }

  createAccountFrom() {
    this.accountForm = this.formBuilder.group({
      firstName: [this.userDetail?.firstName, Validators.required],
      lastName: [this.userDetail?.lastName, Validators.required],
      companyName: [this.userDetail?.companyName, Validators.required],
      nationalIdentity: [''],
      currentPassword: ['', Validators.required],
      newPassword: [''],
    });
  }

  getFindeksByCustomerId(customerId: number) {
    this.findeksService.getByCustomerId(customerId).subscribe((response) => {
      this.findeks = response.data;
      this.accountForm
        .get('nationalIdentity')
        ?.setValue(this.findeks.nationalIdentity);
    });
  }

  updateAccount() {
    if (!this.accountForm.valid) return;

    let userDetailUpdateModel: UserDetailUpdateModelDto = {
      ...this.userDetail,
      ...this.accountForm.value,
    };
    this.userService
      .updateUserDetails(userDetailUpdateModel)
      .subscribe((response) => {
        if (!this.userDetail) return;

        var newUserDetail: UserDetailDto= {
          ...this.userDetail,
          firstName: userDetailUpdateModel.firstName,
          lastName: userDetailUpdateModel.lastName,
          companyName: userDetailUpdateModel.companyName,
        };
        this.authService.setUserDetail(newUserDetail);

        this.toastrService.success(response.message);
        this.router.navigate(['']);
      });
  }

  toggleCurrentPasswordHidden() {
    this.currentPasswordHidden = !this.currentPasswordHidden;
  }

  toggleNewPasswordHidden() {
    this.newPasswordHidden = !this.newPasswordHidden;
  }

  isCurrentPasswordHidden(): string {
    return this.currentPasswordHidden ? 'password' : 'text';
  }

  isNewPasswordHidden(): string {
    return this.newPasswordHidden ? 'password' : 'text';
  }

  isCurrentPasswordHiddenIcon(): string {
    return this.currentPasswordHidden ? 'fa-eye-slash' : 'fa-eye text-primary';
  }

  isNewPasswordHiddenIcon(): string {
    return this.newPasswordHidden ? 'fa-eye-slash' : 'fa-eye text-primary';
  }
}