
import { Component } from '@angular/core';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PeriodicTableComponent],
  template: `
    <h1 style="text-align: center">Periodic Table</h1>
    <app-periodic-table></app-periodic-table>
  `
})
export class AppComponent {}