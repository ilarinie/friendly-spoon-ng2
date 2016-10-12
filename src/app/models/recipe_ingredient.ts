import { Ingredient } from "./ingredient";

export class RecipeIngredient {
  id: number;
  ingredient: Ingredient;
  ingredient_id: number;
  amount: number;
  recipe_id: number;
  recipe_ingredient_group_id: number;
  index: number;
  instruction: string;
  unit_id: number;
}
