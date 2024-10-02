import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDashboardComponent } from './weather/features/weather-dashboard/weather-dashboard.component';
import { WeatherEditorComponent } from './weather/features/weather-editor/weather-editor.component';

export const routes: Routes = [
  {
    path: 'weather',
    component: WeatherComponent,
    children: [
      {
        path: '',
        component: WeatherDashboardComponent,
      },
      {
        path: 'editor/:id',
        component: WeatherEditorComponent,
      },
    ],
  },
];

// /weather
// [weather-dashboard]: displays all weather
// [weather-editor]: id => edits a single weather
