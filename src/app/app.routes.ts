import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { AllUserPage } from './all-user-page/all-user-page';

export const routes: Routes = [


    {
        path: "signup",
        component: Signup

    },
    {
        path: "chatpage",
        component: AllUserPage

    },
    {
        path: "",
        redirectTo: "signup",
        pathMatch: "full"
    }

];
