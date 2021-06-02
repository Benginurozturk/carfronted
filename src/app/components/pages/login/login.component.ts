import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/services/authservice';
import { UserService } from 'src/app/services/userservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          localStorage.setItem('email',loginModel.email);
          this.toastrService.info(response.message);
          localStorage.setItem('token', response.data.token);
          this.getUserByEmail(loginModel.email)
          this.router.navigate(['/']);
         // window.location.reload();
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Doğrulama Hatası');
        }
      );
    }
  }

  getUserByEmail(email:string){
    this.userService.getUserDetailByEmail(email).subscribe((response)=>{
      localStorage.setItem("userFindex", response.data.findexScore.toString())
      localStorage.setItem("customerId", response.data.customerId.toString())
      localStorage.setItem("firstName", response.data.firstName.toString())
      localStorage.setItem("lastName", response.data.lastName.toString())
    })
  }
}