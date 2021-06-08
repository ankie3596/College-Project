import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user_id: String;
  name: String;
  username: String;
  gender: String;
  subject: String;
  email: String;
  designation: String;
  address: String;
  city: String;
  mobile_no: String;
  country: String;
  pin_no: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      // this.update.setValue({
      //   name: data.user[0].name,
      //   username: data.user[0].username,
      //   email: data.user[0].email,
      //   designation: data.user[0].designation
      // })
      this.name = data.user[0].name;
        this.username = data.user[0].username;
        this.gender = data.user[0].gender;
        this.email = data.user[0].email;
        this.designation = data.user[0].designation;
        this.subject = data.user[0].subject;
        this.address = data.user[0].address;
        this.city = data.user[0].city;
        this.mobile_no = data.user[0].mobile_no;
        this.country = data.user[0].country;
        this.pin_no = data.user[0].pin_no;
        this.user_id = data.user[0].user_id;

      console.log('data', data.user[0]);
  },
  err => {
    console.log(err);
    return false;
  });
  }

  onUpdateSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      gender: this.gender,
      subject: this.subject,
      email: this.email,
      designation: this.designation,
      address: this.address,
      city: this.city,
      mobile_no: this.mobile_no,
      country: this.country,
      pin_no: this.pin_no,
      user_id: this.user_id
  };


  // Required Fields
  if ( !this.validateService.validateUpdation(user)) {
    this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
}

// Validate Email
if ( !this.validateService.validateEmail(user.email)) {
  this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
  return false;
}

  // Register User
  this.authService.postUpdate(user).subscribe(data => {
    if (data.success) {
      // console.log("data leke aau ", data);
    this.flashMessage.show('Your profile has been updated', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/profile']);
    } else {
    this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/register']);
    }
    });
    }

}

