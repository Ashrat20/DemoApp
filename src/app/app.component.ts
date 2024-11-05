import { Component,ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { HomeComponent } from "./component/home/home.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { RegistrationformComponent } from './component/registrationform/registrationform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule, HomeComponent, ProfileComponent,RegistrationformComponent],
  providers : [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}


