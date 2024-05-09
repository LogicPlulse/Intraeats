import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  vendor: any = {
    name: '',
    details: '',
    password: ''
  };

  saveChanges() {
    // Implement logic to save changes
    console.log('Changes saved:', this.vendor);
  }

  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['/']);
  }
}


