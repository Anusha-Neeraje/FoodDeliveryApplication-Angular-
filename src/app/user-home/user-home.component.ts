import { Component, OnInit } from '@angular/core';
import { Feedback, Restaurent } from '../model';
import { HttpClientService } from '../service/http-client.service';
import { FormGroup, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  feed:Feedback=new Feedback();
  allRestaurantData!: Restaurent[];
  form: FormGroup=new FormGroup({});
  postData={
    userName:'',
    restaurentName: '',
    feedback:'',
    rating:''
  };
    profileForm = new FormGroup({  //instantiate new form group
    userName: new FormControl(null,[Validators.required]),
    restaurentName: new FormControl(null,[Validators.required]), //within from group instantiate new form control
    feedback: new FormControl(null,[Validators.required]),
    rating: new FormControl(null,[Validators.required]),
  });

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.getRestaurents().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response: any) {
    this.allRestaurantData = response;
    }
    getAllData() {
      this.httpClientService.getRestaurents().subscribe(res => {
        this.allRestaurantData = res;
      })
    }

    onclick(data:any){
      this.profileForm.controls['restaurentName'].setValue(data.restaurentName);
    }

    addFeedback() {
      this.feed = new Feedback();
      this.postData = {
      userName: this.profileForm.controls.userName.value|| '{}',
      restaurentName: this.profileForm.controls.restaurentName.value|| '{}',
      feedback: this.profileForm.controls.feedback.value|| '{}',
      rating: this.profileForm.controls.rating.value|| '{}',
     };
      this.httpClientService.postFeedback(this.postData).subscribe(data => {
      console.log(data);
      alert("Thank You for the Feedback");
      let ref = document.getElementById('clear');
      ref?.click();
      this.profileForm.reset();
      this.getAllData();
    },
      err => {
        alert("Sorry.. There was some problem Try again")
      })
  }

  zoomImg(){
    $("#imagemodal").modal("show")

  }
  Close(){
    $("#imagemodal").modal("hide")

  }
  }

