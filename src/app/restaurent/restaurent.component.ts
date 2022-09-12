import { Component, OnInit } from '@angular/core';
import { HttpClientService} from '../service/http-client.service';
import { Restaurent } from '../model';
import { FormGroup, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';




@Component({
  selector: 'app-restaurent',
  templateUrl: './restaurent.component.html',
  styleUrls: ['./restaurent.component.css']
})
export class RestaurentComponent implements OnInit {
  showAdd!:boolean;
  showbtn!:boolean;
  allRestaurantData!: Restaurent[];
  form: FormGroup=new FormGroup({});
  restaurent: Restaurent= new Restaurent();
  postData={
    restaurentName: '',
    restaurentContact:'',
    restaurentAddress: '',
    restaurentRating: '',
    restaurentMenu:''
  };
    profileForm = new FormGroup({  //instantiate new form group
    restaurentName: new FormControl(null,[Validators.required]), //within from group instantiate new form control
    restaurentContact: new FormControl(null,[Validators.required]),
    restaurentAddress : new FormControl(null,[Validators.required]),
    restaurentRating : new FormControl(null,[Validators.required]),
    restaurentMenu : new FormControl(null,[Validators.required]),
  });

  constructor(private httpClientService: HttpClientService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.httpClientService.getRestaurents().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response: any) {
    this.allRestaurantData = response;
    }

  clickAddRestaurant(){
    this.profileForm.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

    addRestaurant() {
      this.restaurent = new Restaurent();
      this.postData = {
      restaurentName: this.profileForm.controls.restaurentName.value|| '{}',
      restaurentContact: this.profileForm.controls.restaurentContact.value|| '{}',
      restaurentAddress: this.profileForm.controls.restaurentAddress.value|| '{}',
      restaurentRating: this.profileForm.controls.restaurentRating.value|| '{}',
      restaurentMenu: this.profileForm.controls.restaurentMenu.value|| '{}'
     };
  
      this.httpClientService.postRestaurant(this.postData).subscribe(data => {
        console.log(data);
        alert("Restaurant record added successfully");
        let ref = document.getElementById('clear');
        ref?.click();
        this.profileForm.reset();
        this.getAllData();
      },
        err => {
          alert("Sorry.. There was some problem Try again")
        })
    }
  
    getAllData() {
      this.httpClientService.getRestaurents().subscribe(res => {
        this.allRestaurantData = res;
      })
    }
    deleteRestaurant(data: any) {
      this.httpClientService.deleteRestaurant(data.id).subscribe(res => {
         console.log(res);
         alert("Restaurant Record Deleted");
         this.getAllData();
      },
      err => {
        alert("Sorry.. There was some problem Try again")
      })
    }
       
    onEditRestaurant(data: any) {
      this.showAdd=false;
      this.showbtn=true;
      this.restaurent.id=data.id;
      this.profileForm.controls['restaurentName'].setValue(data.restaurentName);
      this.profileForm.controls['restaurentContact'].setValue(data.restaurentContact);
      this.profileForm.controls['restaurentAddress'].setValue(data.restaurentAddress);
      this.profileForm.controls['restaurentRating'].setValue(data.restaurentRating);
      this.profileForm.controls['restaurentMenu'].setValue(data.restaurentMenu);
    }
    updateRestaurant(){
      this.restaurent.restaurentName = this.profileForm.value.restaurentName || '{}';
      this.restaurent.restaurentContact = this.profileForm.value.restaurentContact || '{}';
      this.restaurent.restaurentAddress = this.profileForm.value.restaurentAddress || '{}';
      this.restaurent.restaurentRating = this.profileForm.value.restaurentRating || '{}';
      this.restaurent.restaurentMenu = this.profileForm.value.restaurentMenu || '{}';
  
      this.httpClientService.updateRestaurant(this.restaurent).subscribe(res=>{
        alert("Restaurant Records Updated")
        let ref = document.getElementById('clear');
        ref?.click();
        this.profileForm.reset();
        this.getAllData();
      },err => {
        alert("Sorry.. There was some problem Try again")
      })
    } 
  }