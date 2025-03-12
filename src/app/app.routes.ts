import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ReadmeComponent } from './readme/readme.component';

export const routes: Routes = [
    { // homepage parent route, children below
        path: '', 
        component: HomepageComponent,
        children: [ ] // include inherited children that use homepage styling
    },
    { path: 'readme', component: ReadmeComponent },
];
