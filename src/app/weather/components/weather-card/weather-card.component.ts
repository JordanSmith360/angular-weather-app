import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WeatherEntry } from '../../services/weather.service';

// {
//   "date": "2024-10-01T07:20:33.791709",
//   "temperatureC": 3,
//   "summary": "Balmy",
//   "id": 1,
//   "temperatureF": 37.399568034557234
// },

// smart =>
// dumb => inputs, displays, outputs

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `<mat-card>
      <mat-card-header>
        <mat-card-title>Weather</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Id: {{ dummyObject.id }}</p>
        <p>Date: {{ dummyObject.date | date : 'short' }}</p>
        <p>Temp (C): {{ dummyObject.temperatureC | number : '1.0-2' }}</p>
        <p>Date (F): {{ dummyObject.temperatureF | number : '1.0-2' }}</p>
        <p>Summary: {{ dummyObject.summary }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="onEdit()">Edit</button>
        <button mat-button (click)="onDelete()">Delete</button>
      </mat-card-actions>
    </mat-card>
    <br />`,

  styles: [],
})
export class WeatherCardComponent {
  @Input({ required: true })
  dummyObject!: WeatherEntry;
  @Output()
  onEditEvent = new EventEmitter<number>();
  @Output()
  onDeleteEvent = new EventEmitter<number>();

  onEdit(): void {
    this.onEditEvent.emit(this.dummyObject.id);
  }

  onDelete(): void {
    this.onDeleteEvent.emit(this.dummyObject.id);
  }
}
