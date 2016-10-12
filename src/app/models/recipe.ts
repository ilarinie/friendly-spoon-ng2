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
  public: boolean;
  recipe_tags: RecipeTag[];
  allTags: any[];
  notes: any[];
  recipe_ingredient_groups: RecipeIngredientGroup[];
  introduction: string;
  recipe_pictures: RecipePicture[];
  cover_picture_id: number;
  coverpicture: RecipePicture;
  ratingcount: number;

  incsMoved: boolean;


}
