import { RecipeIngredient } from "./recipe_ingredient";

export class RecipeIngredientGroup {
  recipe_ingredients: RecipeIngredient[];
  name: string;
  id: number;
  recipe_id: number;
}
