import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../shared-material';
import { PeriodicElement, ELEMENT_DATA } from '../data';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [...SHARED_IMPORTS, EditDialogComponent],
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit {
  data: PeriodicElement[] = [];
  filteredData: PeriodicElement[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  filterControl = new FormControl('');

  constructor(private dialog: MatDialog) { }


  ngOnInit(): void {
    this.data = ELEMENT_DATA;
    this.filteredData = [...this.data];

    this.filterControl.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      const filter = value?.toLowerCase() || '';
      this.filteredData = this.data.filter(el =>
        Object.values(el).some(v =>
          v.toString().toLowerCase().includes(filter)
        )
      );
    });
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.data.findIndex(e => e.position === result.position);
        if (index !== -1) {
          this.data[index] = result;
        }
        const filter = this.filterControl.value?.toLowerCase() || '';
        this.filteredData = this.data.filter(el =>
          Object.values(el).some(v =>
            v.toString().toLowerCase().includes(filter)
          )
        );
      }
    });
  }
  clearFilter() {
    this.filterControl.setValue('');
  }
}
