import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule ,Validators,FormArray} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";



@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {

  userId!: number;
  user: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  editProfileForm = new FormGroup({
    firstname: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]+$"),Validators.maxLength(20)]),
    lastname: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]+$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{10}$"),Validators.maxLength(10)]),
    age: new FormControl([20]),
    state : new FormControl(),
    country : new FormControl(),
    address : new FormControl(),
    tags: new FormArray([])
  })

  get firstname(){
    return this.editProfileForm.get('firstname');
  }

  get lastname(){
    return this.editProfileForm.get('lastname');
  }
  
  get email(){
    return this.editProfileForm.get('email');
  }
  get phone() {
    return this.editProfileForm.get('phone');
  }
  get tagsArray() {
    return this.editProfileForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      this.editProfileForm.patchValue(this.user);

      if (this.user.tags) {
        this.user.tags.forEach((tag: string) => {
          this.tagsArray.push(new FormControl(tag));
        });
      }
    });

  }

  onEnterTag(event: KeyboardEvent, tagInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag(tagInput);
    }
  }

 

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  addTag(tagInput: HTMLInputElement): void {
    const tag = tagInput.value.trim();
    if (tag) {
      this.tagsArray.push(new FormControl(tag));
      tagInput.value = '';
    }
  }

  onSubmit() : void {
    if(this.editProfileForm.valid){

      const updatedUserData = {
        ...this.user, 
        ...this.editProfileForm.value,
        tags: this.tagsArray.value
      };
      this.userService.updateuser(this.userId,updatedUserData).subscribe(() =>{
        this.router.navigate(['/profile',this.userId])
      });
    }
    console.log(this.editProfileForm.value);

  }


}
