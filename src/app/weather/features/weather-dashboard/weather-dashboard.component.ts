import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { WeatherEntry, WeatherService } from '../../services/weather.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, WeatherCardComponent],
  templateUrl: './weather-dashboard.component.html',
  styles: [],
})
export class WeatherDashboardComponent {
  weatherService = inject(WeatherService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  trackByItems(index: number, item: WeatherEntry): number {
    return item.id;
  }

  onItemEdit(id: number) {
    console.log('Editing' + id);
    this.router.navigate(['editor', id], { relativeTo: this.route });
  }

  onItemDelete(id: number) {
    console.log('Deleting' + id);
    this.weatherService.removeOption(id);
  }
}
