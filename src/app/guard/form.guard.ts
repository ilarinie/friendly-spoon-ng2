/**
 * Created by Ilari on 9.10.2016.
 */
import { CanDeactivate } from '@angular/router';
import { MypageComponent} from "../user/mypage.component";
import {RecipeFormComponent} from "../recipe-form/recipe-form.component";


export class UserFormLeaveConfirmation implements CanDeactivate<MypageComponent> {

  canDeactivate(target: MypageComponent) {
    if (target.hasChanges()) {
      return window.confirm('You have unsaved changes, really leave?');
    }
    return true;
  }
}

export class RecipeFormLeaveConfirmation implements CanDeactivate<RecipeFormComponent> {

  canDeactivate(target: RecipeFormComponent) {

    if(target.hasChanges() && target.incsMoved()){
      return window.confirm('The recipe has unsaved changes on the order of the ingredients and on attributes, really leave?');
    }
    if (target.hasChanges()) {
      return window.confirm('The recipe has unsaved attributes, really leave?');
    }
    if (target.incsMoved()){
      return window.confirm('You haven\'t saved the new ingredient/ingredient group order, really leave?');
    }
    return true;
  }


}
