import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WeatherEntry, WeatherService } from '../../services/weather.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

export type FormDataType = Omit<WeatherEntry, 'id' | 'temperatureF'>;

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

@Component({
  selector: 'app-weather-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './weather-editor.component.html',
  styles: [],
})
export class WeatherEditorComponent implements OnInit {
  @Input({ transform: numberAttribute }) id = 0;

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  weatherService = inject(WeatherService);
  weatherEntry?: WeatherEntry;

  formGroup: ModelFormGroup<FormDataType> = this.fb.nonNullable.group({
    summary: ['', [Validators.required]],
    temperatureC: [0, [Validators.min(50), Validators.max(100)]],
    date: [new Date(), [Validators.required]],
  });

  ngOnInit(): void {
    this.weatherService.getWeatherEntryById(this.id).subscribe((result) => {
      console.log('Result', result);
      this.weatherEntry = result;
      this.formGroup.setValue({
        date: result.date,
        summary: result.summary,
        temperatureC: result.temperatureC,
      });
    });
  }

  onFormSubmission() {
    this.weatherService.updateWeatherEntry({
      ...this.weatherEntry!,
      ...this.formGroup.getRawValue(),
    });
    this.router.navigate(['/weather'], { relativeTo: this.route });
  }
}
