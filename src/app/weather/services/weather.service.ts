import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface WeatherEntry {
  id: number;
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);
  weatherEntries$ = this.getWeatherEntries();
  _weatherEntries = signal<WeatherEntry[]>([]);
  weatherEntries = computed(() => this._weatherEntries());

  constructor() {
    this.weatherEntries$.subscribe((results) => this._weatherEntries.set(results));
  }

  removeOption(id: number) {
    this._weatherEntries.set(this._weatherEntries().filter((x) => x.id != id));
  }

  getWeatherEntries() {
    return this.http.get<WeatherEntry[]>(`${environment.url}weather`);
  }

  getWeatherEntryById(id: number) {
    return this.http.get<WeatherEntry>(`${environment.url}weather/${id}`);
  }

  updateWeatherEntry(item: WeatherEntry) {
    return this.http
      .put(`${environment.url}weather`, {
        id: item.id,
        date: item.date,
        summary: item.summary,
        temperature: item.temperatureC,
      })
      .subscribe(() => {
        const list = this._weatherEntries();
        const index = list.findIndex((x) => x.id == item.id);
        list[index] = item;
        this._weatherEntries.set(list);
      });
  }
}
