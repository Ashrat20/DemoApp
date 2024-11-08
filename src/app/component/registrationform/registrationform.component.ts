import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, FormControl, Validators } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import e, { response } from 'express';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-registrationform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HomeComponent],
  templateUrl: './registrationform.component.html',
  styleUrl: './registrationform.component.css'
})
export class RegistrationformComponent {
  isopen: boolean = false;
  imageError: string = '';
  previewImage: string | ArrayBuffer | null = '';
  constructor(private userService: UserService,
    private router: Router, private homeComponent: HomeComponent) { }
  registrationform = new FormGroup({

    firstname: new FormControl('', [Validators.required, Validators.pattern("^[a-z A-Z]+$"), Validators.maxLength(20)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern("^[a-z A-Z]+$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)]),
    age: new FormControl(20,[Validators.required,Validators.min(20),Validators.max(60)]),
    state: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    address: new FormControl(),
    image: new FormControl(null),
    tags: new FormArray([]),
    subscribe: new FormControl(false)
  });
  get firstname() {
    return this.registrationform.get('firstname');
  }

  get lastname() {
    return this.registrationform.get('lastname');
  }

  get email() {
    return this.registrationform.get('email');
  }

  emailblur(){
    if(this.email){
      this.email.markAsTouched();
    }
  }

  get phone() {
    return this.registrationform.get('phone');
  }

  get tagsArray() {
    return this.registrationform.get('tags') as FormArray;
  }

 
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
  
        image.onload = () => {
          if (image.width <= 310 && image.height <= 325) {
            this.imageError = ''; 

            this.registrationform.patchValue({
              image: e.target.result, 
            });
           
            this.previewImage = e.target.result; 
          } else {
            this.imageError = 'Image must be between 310 and 325 pixels only';
            this.registrationform.patchValue({
              image: null,
            });
            this.previewImage = null; 
          }
        };
      };
  
      reader.readAsDataURL(file); 
    } else {
      console.log('No file selected');
    }
  }

  triggerFileInput(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onEnterTag(event: KeyboardEvent, tagInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag(tagInput);
    }
  }





  addTag(tagInput: HTMLInputElement): void {
    const tag = tagInput.value.trim();
    if (tag) {
      this.tagsArray.push(new FormControl(tag));
      tagInput.value = '';
    }
    console.log(this.tagsArray.controls);
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }



  closeModal() {
    this.homeComponent.closeModal();
  }

  resetForm(){
    this.registrationform.reset({
      'state': '',
      'country': '',
      'age' : 20
    });
    this.previewImage = null;
    this.tagsArray.clear();
  }


  onSubmit() {
    if (this.registrationform.valid) {
      this.userService.registeruser(this.registrationform.value).subscribe((user: any) => {
        console.log(this.registrationform.value)
        this.router.navigate(['/profile', user.id])
      })
    }
  }



}


