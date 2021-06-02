import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  firstName:string = localStorage.getItem("firstName")
  lastName:string = localStorage.getItem("lastName")
  userDetail:UserDetailDto
   userLoginStatus:boolean=false
  constructor(private authService:AuthService,private userService:UserService, private router : Router) {}

  ngOnInit(): void {
    this.isLogin()
    //this.getUserByEmail()
  }

   isLogin() {
   if(this.authService.isAuthenticated()){
     this.userLoginStatus=true

   }else{
     this.userLoginStatus=false
   }
   }

   logOut() {
    this.authService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }

   
   
}