import { Recipe } from '../models/recipe';
import { Event } from './event';
import { Day } from './dayModel';
import { MonthPickerComponent } from 'ng2-bootstrap';
import { Component } from '@angular/core';
import {FriendlyApiService} from "../services/friendlyapi.service";


@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

    today: Date;
    firstOfMonth: Date;
    lastOfMonth: Date;
    lastOfLastMonth: Date;
    month: any = [];
    weekDays: any = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    monthDisplay: Date;
    selectedDay: Day;
    recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes"));

    events: Event[] = []

    nEvent: Event = new Event();

    currentMonthOffset: number;

    constructor(private friendlyApiService: FriendlyApiService){
        this.today = new Date();
        this.monthDisplay = new Date();
        this.populateMonth(this.today);
        this.currentMonthOffset = 0;
        this.getEvents();
    }
    
    nextMonth(){
        this.currentMonthOffset++;
        this.populateMonth( new Date(this.today.getFullYear(), this.today.getMonth() + this.currentMonthOffset, this.today.getDate()));
    }
    previousMonth(){
        this.currentMonthOffset--;
        console.log(this.currentMonthOffset);
        this.populateMonth( new Date(this.today.getFullYear(), this.today.getMonth() + this.currentMonthOffset, this.today.getDate()));
    }

    getEvents(){
        this.friendlyApiService.getEvents().then( (res) => {
            this.events = res;
            for (let event of this.events){
                event.date = new Date(event.date);
            }
            this.populateMonth(new Date())
        });
    }
    postEvent(){
        this.friendlyApiService.saveEvent(this.nEvent).then((res) => {
            this.events.push(res);
            this.nEvent = new Event();
        })
    }

    newEvent(day: Day){
        this.selectedDay = day;
    }
    populateMonth(date: Date){
        this.month = [];
        this.monthDisplay = date;
        this.firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        this.lastOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
        this.lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let day = this.firstOfMonth.getDay();
        if (day === 0) {
            day = 7;
        }

        // Previous months last days
        if ( day !== 1) {
            for (let i = 2; i <= day; i++) {
                let filler = new Date(this.lastOfLastMonth.getFullYear(),
                                          this.lastOfLastMonth.getMonth(),
                                          this.lastOfLastMonth.getDate() - ( day - i ));
                let fillerDay = new Day();
                fillerDay.date = filler;
                fillerDay.currentMonth = false;

                this.month.push(fillerDay);
            }
        }
        // Current months days
        for (let i = 0; i < this.lastOfMonth.getDate() ; i++) {
            let realDate = new Date(date.getFullYear(),
                                    date.getMonth(),
                                    this.firstOfMonth.getDate() + i);

            let fillerDay = new Day();
            if (realDate.getDate() === this.today.getDate()
                && realDate.getFullYear() == this.today.getFullYear()
                && realDate.getMonth() == this.today.getMonth() ) {
                fillerDay.currentDay = true;
            }
            for (let event of this.events) {
                event.date = new Date(event.date);
                console.log(event.date.getFullYear() + ' year, real ' + realDate.getFullYear());
                console.log(event.date.getMonth() + ' month, real ' + realDate.getMonth());
                console.log(event.date.getDate() + ' date, real ' + realDate.getDate());



                if (event.date.getFullYear() === realDate.getFullYear() &&
                    event.date.getMonth() === realDate.getMonth() &&
                    event.date.getDate() === realDate.getDate() ) {
                    console.log("jea")
                    fillerDay.events.push(event);
                }
            }



            fillerDay.date = realDate;
            fillerDay.currentMonth = true;

            this.month.push(fillerDay);
        }
        let day2 = this.lastOfMonth.getDay();
        // Next months first days
        if ( day2 != 0 ){
            let days = 7-day2;
            for (let i = 1; i <= days; i++){
                let filler = new Date(date.getFullYear(), date.getMonth() + 1, i);
                let fillerDay = new Day();
                fillerDay.date = filler;
                fillerDay.currentMonth = false;

                this.month.push(fillerDay);
            }
        }
    }

    

}