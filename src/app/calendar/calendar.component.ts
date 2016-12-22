import { Recipe } from '../models/recipe';
import { RecipeIngredient } from '../models/recipe_ingredient';
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
    filter:any = "";

    addToCart: boolean = false;

    fromDate: any;
    toDate: any;
    incList: RecipeIngredient[] = [];

    recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes"));

    events: Event[] = []

    nEvent: Event = new Event();
    nEventDate: string = "";
    chosenRecipe: any = {};
    addEvent: boolean = false;

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
            this.addEvent = false;
            this.populateMonth( new Date(this.today.getFullYear(), this.today.getMonth() + this.currentMonthOffset, this.today.getDate()) );
        })
    }

    newEvent(day: Day){
        this.selectedDay = day;
        let daystring = ("0" + day.date.getDate()).slice(-2);
        let monthstring = ("0" + (day.date.getMonth()+1) ).slice(-2);

        let dateString = day.date.getFullYear()+"-"+monthstring+"-"+daystring;

        this.nEventDate = dateString;
        
        this.addEvent = true;
    }
    chooseRecipe(recipe){
        this.chosenRecipe = recipe;
        this.filter = "";
    }

    saveEvent(){
        this.nEvent.date = new Date(this.nEventDate)
        this.nEvent.recipe_id = this.chosenRecipe.id;
        this.postEvent();
    }
    nextWeeksIngredients() {



    }
    listIncs(){
        let from = new Date(this.fromDate);
        console.log("From " + from);
        let to = new Date(this.toDate);
        console.log("to " + to);
        let eventHelper  = this.events;
        console.log(this.events.length)
        for (let event of eventHelper){
            let deit = new Date(event.date);
            console.log("deit " + deit);
          

            if (deit > from && deit < to){
                
                
                if (event.recipe.recipe_ingredients){
                   
                for (let inc of event.recipe.recipe_ingredients){
                   
                    this.incList.push(inc);
                    
                }
                }
                if (event.recipe.recipe_ingredient_groups) {
                for (let group of event.recipe.recipe_ingredient_groups){
                    if (group.recipe_ingredients){
                    for (let inc of group.recipe_ingredients){
                        this.incList.push(inc);
                    }
                    }
                }
                }

            }
        }

        


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
                if (event.date.getFullYear() === realDate.getFullYear() &&
                    event.date.getMonth() === realDate.getMonth() &&
                    event.date.getDate() === realDate.getDate() ) {
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