import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <p>weather works!</p>
    <a routerLink="/weather">Dashboard</a>
    <a routerLink="/weather/editor">Editor</a>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class WeatherComponent {}
