import {RecipeIngredient} from "./recipe_ingredient";
import {User} from "./user";
/**
 * Created by Ilari on 11.10.2016.
 */
export class ShoppingCartItem {
  id: number;
  user: User;
  user_id: number;
  recipe_ingredient: RecipeIngredient;
  recipe_ingredient_id: number;
}
