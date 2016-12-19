import { Event } from './event';
import { Recipe } from '../models/recipe';

export class Day {
    date: Date;
    recipes: Recipe[];
    currentMonth: boolean;
    currentDay: boolean = false;
    events: Event[] = [];
}