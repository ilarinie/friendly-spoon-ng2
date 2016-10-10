/**
 * Created by Ilari on 9.10.2016.
 */
import { CanDeactivate } from '@angular/router';
import {UserComponent} from "../user/user.component";
import {RecipeComponent} from "../recipe/recipe.component";


export class UserFormLeaveConfirmation implements CanDeactivate<UserComponent> {

  canDeactivate(target: UserComponent) {
    if(target.hasChanges()){
      return window.confirm('You have unsaved changes, really leave?');
    }
    return true;
  }
}

export class RecipeFormLeaveConfirmation implements CanDeactivate<RecipeComponent> {

  canDeactivate(target: RecipeComponent) {
    if(target.hasChanges()){
      return window.confirm('Do you really want to leave?');
    }
    return true;
  }


}
