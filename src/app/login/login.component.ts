import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { HttpClientService } from '../service/http-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loginuser: User = new User();
  postData = {
    email: '',
    password: ''
  };
  postDataOTP = {
    email: '',
  };
  profileForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private httpService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  getOTP(){
    this.postDataOTP = {
      email: this.profileForm.controls.email.value || '{}',
    };
    this.httpService.funcOTP(this.postDataOTP).subscribe(data=>{
      alert("OTP is sent to registered Email-Id");
      let ref = document.getElementById('clear');
      ref?.click();
      this.profileForm.reset();
      this.router.navigateByUrl('/verifyOtp');
    },error => alert("Sorry"));

  }

  userLogin() {
    this.loginuser = new User();
    this.postData = {
      email: this.profileForm.controls.email.value || '{}',
      password: this.profileForm.controls.password.value || '{}',
    };
    this.httpService.loginUser(this.postData).subscribe(data => {
      let ref = document.getElementById('clear');
      ref?.click();
      this.profileForm.reset();
      if (this.postData.email == "admin@gmail.com") {
        alert("Successfully Logged In");
        this.router.navigateByUrl("/restaurent")

      }
      else{
        alert("Successfully Logged In");
        this.router.navigateByUrl('/userHome')
      }

    }, error => alert("Sorry"));
      let ref = document.getElementById('clear');
      ref?.click();
      this.profileForm.reset();
  }

}
