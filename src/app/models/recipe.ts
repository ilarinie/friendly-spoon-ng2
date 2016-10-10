import {RecipeIngredientGroup} from './recipe_ingredient_group';
import { Level } from "./level";
import { Duration } from "./duration";
import { RecipeIngredient } from "./recipe_ingredient";
import { Ingredient } from "./ingredient";
import { RecipeTag } from "./recipe_tag";
import {RecipePicture} from "./recipe_picture";


export class Recipe {
  id: number;
  user_id: number;
  name: string;
  level: Level;
  duration: Duration;
  level_id: number;
  duration_id: number;
  instruction: string;
  ratingaverage: number;
  recipe_ingredients: RecipeIngredient[];
  ingredients: Ingredient[];
  keyword: string;
  recipe_tags: RecipeTag[];
  allTags: any[];
  notes: any[];
  recipe_ingredient_groups: RecipeIngredientGroup[];
  introduction: string;
  recipe_pictures: RecipePicture[];
  cover_picture_id: number;
  coverpicture: RecipePicture;
  ratingcount: number;



  hasEqualAttributes(other: Recipe){
    return this.name == other.name && this.level_id == other.level_id && this.duration_id == other.duration_id &&
        this.instruction == other.instruction && this.keyword == other.keyword && this.introduction == other.introduction;
  }

}
