// menu-management.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importing FormBuilder and FormGroup from @angular/forms
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {
  foodItemForm!: FormGroup;
  router: any;

  constructor(private formBuilder: FormBuilder, router: Router) { }


  ngOnInit(): void {
    this.foodItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  addFoodItem() {
    if (this.foodItemForm.valid) {
      // Add your logic to save the food item here
      console.log('Adding food item:', this.foodItemForm.value);
      // You can also reset the form after adding the food item
      this.foodItemForm.reset();
    }
  }
  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['/']);
  }
}
