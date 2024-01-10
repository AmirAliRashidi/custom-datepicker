import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateForm: FormGroup;
  showDatePicker: 'none' | 'dateTime' | 'date' = 'none';

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.dateForm = this.fb.group({
      dateTime: [''],
      date: ['']
    });
  }

  setValue(body: string, field: string) {
    let format = field === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-ddTHH:mm:ss';
    (this.dateForm as any).get(field).setValue(this.datePipe.transform(body, format));
  }
}
