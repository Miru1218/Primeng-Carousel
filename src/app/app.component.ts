import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ChipsModule } from 'primeng/chips';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ChipsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  formGroup!: FormGroup;
  cities!: { name: string; code: string }[];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.formGroup = new FormGroup({
      selectedCities: new FormControl<any[] | null>(null),
      chipsValues: new FormControl<any[]>([])
    });

    this.formGroup.get('selectedCities')?.valueChanges.subscribe(selected => {
      console.log(selected);
      this.updateChipsValues(selected);
    });

    this.formGroup.get('chipsValues')?.valueChanges.subscribe(chips => {
      console.log(chips);
      this.updateSelectedCities(chips);
    });

  }

  // 更新 chipsValues 的方法
  private updateChipsValues(selectedCities: any[]) {
    const chipsControl = this.formGroup.get('chipsValues') as FormControl;

    // 檢查選擇的城市是否已經存在於 chips 中，避免無限循環
    const cityNames = selectedCities ? selectedCities.map(city => city.name) : [];

    if (JSON.stringify(chipsControl.value) !== JSON.stringify(cityNames)) {
      chipsControl.setValue(cityNames);
    }
  }

  // 更新 selectedCities 的方法
  private updateSelectedCities(chips: any[]) {
    const multiSelectControl = this.formGroup.get('selectedCities') as FormControl;

    // 檢查 chips 是否已經存在於 selectedCities 中，避免無限循環
    const selectedOptions = this.cities.filter(city => chips.includes(city.name));

    if (JSON.stringify(multiSelectControl.value) !== JSON.stringify(selectedOptions)) {
      multiSelectControl.setValue(selectedOptions);
    }
  }
  preventInput(event: KeyboardEvent) {
    console.log(event);
    event.preventDefault(); // 阻止輸入
  }
}