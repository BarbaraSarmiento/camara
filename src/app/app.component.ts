import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CamarComponent } from './Components/camar/camar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CamarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
