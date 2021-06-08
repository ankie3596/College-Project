import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  name: String;
  email: String;
  city: String;
  title: String;
  message: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    const user1 = {
      name: this.name,
      email: this.email,
      city: this.city,
      title: this.title,
      message: this.message
    };

    console.log('contact us ts', user1);

  // Validate Email
     if (!this.validateService.validateEmail(user1.email)) {
        this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
     }

     // Contact Email
    this.contactService.contactUser(user1).subscribe(data =>  {
      if (data.success) {
        this.flashMessage.show('Your query has been sent', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['contact-us']);
      }
    });
  }
}
