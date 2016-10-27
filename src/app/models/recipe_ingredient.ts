import {Ingredient} from "./ingredient";
import {Unit} from "./unit";

export class RecipeIngredient {
  id: number;
  ingredient: Ingredient;
  ingredient_id: number;
  amount;
  recipe_id: number;
  recipe_ingredient_group_id: number;
  index: number;
  instruction: string;
  unit_id: number;
  unit: Unit;

  toString(): string {
    return this.fractioner(this.amount) + " " + this.unit.name + " " + this.ingredient.name + " " + this.instruction
  }

  private fractioner(decimal) {
    if (!decimal) {
      return decimal;
    }
    var whole = String(decimal).split('.')[0];
    decimal = parseFloat("." + String(decimal).split('.')[1]);
    var mum = "1";
    for (let z = 0; z < String(decimal).length - 2; z++) {
      mum += "0";
    }
    var num;
    num = parseInt(mum);
    decimal = decimal * num;

    for (var z = 2; z < decimal + 1; z++) {
      if (decimal % z == 0 && num % z == 0) {
        decimal = decimal / z;
        num = num / z;
        z = 2;
      }
    }
    //if format of fraction is xx/xxx
    if (decimal.toString().length == 2 &&
      num.toString().length == 3) {
      //reduce by removing trailing 0's
      decimal = Math.round(Math.round(decimal) / 10);
      num = Math.round(Math.round(num) / 10);
    }
    //if format of fraction is xx/xx
    else if (decimal.toString().length == 2 &&
      num.toString().length == 2) {
      decimal = Math.round(decimal / 10);
      num = Math.round(num / 10);
    }
    //get highest common factor to simplify
    var t = this.HCF(decimal, num);

    //return the fraction after simplifying it
    if (decimal == 0) {
      return whole;
    }
    else if (whole == "0") {
      return "<sup>" + decimal + "</sup>&frasl;<sub>" + num + "</sub>"
    }
    else {
      return whole + " " + "<sup>" + decimal + "</sup>&frasl;<sub>" + num + "</sub>"
    }

  }

  HCF(u, v) {
    var U = u, V = v
    while (true) {
      if (!(U %= V)) return V
      if (!(V %= U)) return U
    }
  }

}
