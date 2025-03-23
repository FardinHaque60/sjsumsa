import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FooterComponent, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
