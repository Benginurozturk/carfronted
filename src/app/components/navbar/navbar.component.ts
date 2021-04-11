import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { AuthService } from 'src/app/services/authservice';
import { UserService } from 'src/app/services/userservice';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent 
implements OnInit {
  userDetail:UserDetailDto
   userLoginStatus:boolean=false
  constructor(private authService:AuthService,private userService:UserService) {}

  ngOnInit(): void {
    this.isLogin()
    this.getUserByEmail()
  }

   isLogin() {
   if(this.authService.isAuthenticated()){
     this.userLoginStatus=true

   }else{
     this.userLoginStatus=false
   }
   }

   getUserByEmail(){
     this.userService.getUserDetailByEmail(
       localStorage.getItem("email")

     ).subscribe((response)=>{
       this.userDetail=response.data
       console.log(this.userDetail)
       localStorage.setItem("customerId", response.data.customerId.toString())
     })
   }
   
}