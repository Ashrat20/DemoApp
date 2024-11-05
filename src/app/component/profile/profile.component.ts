import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormGroup } from '@angular/forms';
import { EditprofileComponent } from "../editprofile/editprofile.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, EditprofileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user: any;
  imageError: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    });
  }
  editprofile(): void {
    this.router.navigate(['/editprofile', this.userId]);
  }

  triggerFileInput() {

    const fileInput = document.getElementById('photoinput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileselect(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          if (image.width <= 310 && image.height <= 325) {
            this.imageError = '';
            this.user.image =  reader.result as string;
            this.updateUserPhoto();
          }
          else {
            this.imageError = "image must be 310 to 325 pixels only";
          }
        };
        image.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserPhoto() {
    // this.userId = +this.route.snapshot.paramMap.get('id')!;
    return this.userService.updateuser(this.userId, this.user).subscribe({
      next: (photoupadate) => {
        this.user = photoupadate;
      console.log('photo updated', photoupadate);
      }
      
    })
  }


}


