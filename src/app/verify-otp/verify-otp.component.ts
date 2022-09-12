import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { HttpClientService } from '../service/http-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();
  postData = {
    password: ''
  };
  profileForm = new FormGroup({ 
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private httpService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  ChangePassword(){
    this.user.password = this.profileForm.value.password || '{}';
    this.httpService.updatePassword(this.user).subscribe(res=>{
      alert("Password Updated Successfully")
      let ref = document.getElementById('clear');
      ref?.click();
      this.profileForm.reset();
      this.router.navigateByUrl("/login");
    },err => {
      alert("Sorry.. There was some problem Try again")
    })
  } 

  }
