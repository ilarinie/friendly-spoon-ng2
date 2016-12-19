import { Recipe } from '../models/recipe';

export class Event {
    recipeName: string;
    username: string;
    date: Date;
    cooked: boolean;

    constructor(recipeName, username, date, cooked){
        this.recipeName = recipeName;
        this.username = username;
        this.date = date;
        this.cooked = cooked;
    }
}