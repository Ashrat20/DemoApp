import { Routes } from '@angular/router';
import { RegistrationformComponent } from './component/registrationform/registrationform.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'registration', component: RegistrationformComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'editprofile/:id',component: EditprofileComponent}
];

