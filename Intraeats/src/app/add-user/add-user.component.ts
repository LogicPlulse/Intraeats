// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      // Form is valid, handle form submission here
      console.log(this.user);
      // You can send the form data to your backend API for further processing
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }
}
