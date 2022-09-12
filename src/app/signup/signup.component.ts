import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service'
import { FormGroup, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../model';
import { MustMatch } from '../MustMatch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();
  postData = {
    name: '',
    email: '',
    password: '',
    cpassword: ''
  };


  profileForm = new FormGroup({  //instantiate new form group
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]), //within from group instantiate new form control
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    cpassword: new FormControl(null, [Validators.required]),
  });
  submitted!: boolean;
  get f() {
    return this.profileForm.controls
  }

  constructor(private httpService: HttpClientService, private FB: FormBuilder, private router:Router) {
    this.profileForm = FB.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]), //within from group instantiate new form control
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      cpassword: new FormControl(null, [Validators.required]),
    },
      {
        validators: MustMatch('password', 'cpassword')
      })
  }
  SaveForm() {

  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.profileForm.controls.name.value);
    console.log(this.profileForm.controls.email.value);
    console.log(this.profileForm.controls.password.value);
    console.log(this.profileForm.controls.cpassword.value);
    this.user = new User();
    this.postData = {
      name: this.profileForm.controls.name.value || '{}',
      email: this.profileForm.controls.email.value || '{}',
      password: this.profileForm.controls.password.value || '{}',
      cpassword: this.profileForm.controls.cpassword.value || '{}',
    };


    this.httpService.adduser(this.postData).subscribe(data => {
      alert("Successfully Registered User")
      let ref = document.getElementById('clear');
      ref?.click();
      this.profileForm.reset();
      this.router.navigateByUrl('/userHome');
    }, error => alert("Sorry"));
  }

}
