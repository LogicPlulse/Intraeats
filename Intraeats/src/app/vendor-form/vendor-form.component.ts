import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent {
  vendor = {
    name: '',
    description: '',
    image: null,
    menu: ''
  };

  vendorForm = new FormGroup({
    name: new FormControl(this.vendor.name, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(this.vendor.description, [Validators.required, Validators.minLength(10)]),
    image: new FormControl(this.vendor.image, [Validators.required]),
    menu: new FormControl(this.vendor.menu, [Validators.required])
  });
categoryForm: any;

  handleImageChange(event: any) {
    this.vendor.image = event.target.files[0];
  }

  onSubmit() {
    console.log('Form submitted:', this.vendor);
    // TODO: Implement form submission logic
  }
}