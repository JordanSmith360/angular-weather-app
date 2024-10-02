import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherEditorComponent } from './weather-editor.component';

describe('WeatherEditorComponent', () => {
  let component: WeatherEditorComponent;
  let fixture: ComponentFixture<WeatherEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeatherEditorComponent]
    });
    fixture = TestBed.createComponent(WeatherEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
