import {ShoppingCartItem} from "./shopping_cart_item";
/**
 * Created by ile on 10/6/16.
 */
export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

  ratingcount: number;
  recipecount: number;
  averagerating: number;

  shopping_cart_items: ShoppingCartItem[];


}
