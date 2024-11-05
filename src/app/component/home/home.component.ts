import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileComponent } from "../profile/profile.component";
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { RegistrationformComponent } from "../registrationform/registrationform.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent, CommonModule,RegistrationformComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  
}
