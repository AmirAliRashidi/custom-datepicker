import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
    @Output() onChange = new EventEmitter<any>();
    @Output() onClose = new EventEmitter<any>();
    @Input() previousDay: string = '';
    @Input() formatDate: 'Date' | 'DateTime' = 'Date';

    selectedDate: Date | string = '';
    tab: 'Day' | 'Month' | 'Year' = 'Day';
    selectableYears: number[] = [];
    selectedYear: number = 0;
    selectableMonth: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    selectedMonth: string = '';
    selectableDays: dayOfMonth[] = [];
    selectedDay: number = 0;
    selectableHour: number[] = [];
    selectableMined: number[] = [];
    selectedHour: number = 0;
    selectedMinute: number = 0;
    selectedSecond: number = 0;

    constructor() { }

    ngOnInit() {
        this.selectedDate = this.previousDay ? new Date(this.previousDay) : new Date();
        this.selectedYear = this.selectedDate.getFullYear();
        this.selectedMonth = this.selectedDate.toLocaleString('default', { month: 'long' });
        this.selectedDay = this.selectedDate.getDate();
        this.selectedHour = +this.selectedDate.getHours();
        this.selectedMinute = +this.selectedDate.getMinutes();
        this.selectedSecond = 0;
        if (this.formatDate === 'DateTime') {
            for (let i = 0; i <= 23; i++) {
                this.selectableHour.push(i);
            }
            for (let i = 0; i <= 59; i++) {
                this.selectableMined.push(i);
            }
            this.selectedHour = this.selectedDate.getHours();
            this.selectedMinute = this.selectedDate.getMinutes();
            this.selectedSecond = this.selectedDate.getSeconds();
        }
        this.getAllDaysInMonth(this.selectableMonth.indexOf(this.selectedMonth), this.selectedYear);
    }

    ngOnChanges() {
        this.tab = 'Day';
    }

    initYears() {
        this.selectableYears = [];
        for (let i = -7; i <= 7; i++) {
            this.selectableYears.push(this.selectedYear + i);
        }
    }

    getAllDaysInMonth(month: number, year: number) {
        const date = new Date(year, month);
        const numberOfDaysInMonth = date.getMonth() + 1 === 12 ? 29 : 30;
        this.selectableDays = [];
        for (let i = 1; i <= numberOfDaysInMonth; i++) {
            const day = new Date(year, month, i)
            this.selectableDays.push({
                dayOftheMonth: i,
                dayOftheWeek: day.getDay(),
                show: true,
            })
        }
        this.checkMonthDays();
    }

    changes(command: 'next' | 'previous') {
        if (this.tab === 'Day') {
            let monthIndex: number = this.selectableMonth.indexOf(this.selectedMonth);
            if (command === 'next') {
                monthIndex++;
            } else if (command === 'previous') {
                monthIndex--;
            }
            if (monthIndex === 12) {
                monthIndex = 0;
                this.selectedYear++;
            } else if (monthIndex === -1) {
                monthIndex = 11;
                this.selectedYear--;
            }
            this.selectedMonth = this.selectableMonth[monthIndex];
            this.getAllDaysInMonth(this.selectableMonth.indexOf(this.selectedMonth), this.selectedYear)
        } else if (this.tab === 'Month') {
            if (command === 'next') {
                this.selectedYear++;
            } else {
                this.selectedYear--;
            }
        } else if (this.tab === 'Year') {
            let minimum = command === 'next' ? this.selectableYears[this.selectableYears.length - 1] : this.selectableYears[0] - 16;
            this.selectableYears = [];
            for (let i = 1; i <= 15; i++) {
                this.selectableYears.push(minimum + i)
            }
        }
    }

    getNowDate() {
        this.selectedDate = new Date();
        this.selectedYear = this.selectedDate.getFullYear();
        this.selectedMonth = this.selectedDate.toLocaleString('default', { month: 'long' });
        this.selectedDay = this.selectedDate.getDate();
        if (this.formatDate === 'DateTime') {
            this.selectedHour = this.selectedDate.getHours();
            this.selectedMinute = this.selectedDate.getMinutes();
            this.selectedSecond = this.selectedDate.getSeconds();
        }
        this.tab = 'Day';
        this.getAllDaysInMonth(this.selectableMonth.indexOf(this.selectedMonth), this.selectedYear);
        this.selectDate();
        this.onClose.emit();
    }

    checkMonthDays() {
        if (this.selectableDays && this.selectableDays.length > 0) {
            if (this.selectableDays[0].dayOftheWeek !== 6) {
                for (let i = 0; i <= this.selectableDays[i].dayOftheWeek; i++) {
                    this.selectableDays.unshift({
                        dayOftheMonth: 0,
                        dayOftheWeek: 0,
                        show: false,
                    })
                }
            }
        }
    }

    selectDay(day: dayOfMonth) {
        if (day.show) {
            this.selectedDay = day.dayOftheMonth;
            this.selectDate();
        }
    }

    selectDate() {
        this.selectedDate = new Date(this.selectedYear, this.selectableMonth.indexOf(this.selectedMonth), this.selectedDay, this.selectedHour, this.selectedMinute, this.selectedSecond);
        this.onChange.emit(this.selectedDate);
    }

    changeTime(mode: 'min' | 'hour' | 'sec', step: 'next' | 'pre') {
        if (mode === 'hour') {
            if (step === 'next' && this.selectedHour < 23) {
                this.selectedHour++;
            } else if (step === 'pre' && this.selectedHour > 0) {
                this.selectedHour--;
            }
        } else if (mode === 'min') {
            if (step === 'next' && this.selectedMinute < 59) {
                this.selectedMinute++;
            } else if (step === 'pre' && this.selectedMinute > 0) {
                this.selectedMinute--;
            }
        } else if (mode === 'sec') {
            if (step === 'next' && this.selectedSecond < 59) {
                this.selectedSecond++;
            } else if (step === 'pre' && this.selectedSecond > 0) {
                this.selectedSecond--;
            }
        }
        this.selectDate();
    }
}

interface dayOfMonth {
    dayOftheMonth: number,
    dayOftheWeek: number,
    show?: boolean,
}