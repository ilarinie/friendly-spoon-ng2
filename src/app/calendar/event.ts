import { Recipe } from '../models/recipe';

export class Event {
    id: number;
    recipe: Recipe;
    recipe_id: number;
    username: string;
    date: Date;
    cooked: boolean;


}