/**
 * Created by Ilari on 9.10.2016.
 */
import { CanDeactivate } from '@angular/router';
import {UserComponent} from "../user/user.component";
import {RecipeFormComponent} from "../recipe-form/recipe-form.component";


export class UserFormLeaveConfirmation implements CanDeactivate<UserComponent> {

  canDeactivate(target: UserComponent) {
    if (target.hasChanges()) {
      return window.confirm('You have unsaved changes, really leave?');
    }
    return true;
  }
}

export class RecipeFormLeaveConfirmation implements CanDeactivate<RecipeFormComponent> {

  canDeactivate(target: RecipeFormComponent) {
    if (target.hasChanges()) {
      return window.confirm('The recipe has unsaved changes, really leave?');
    }
    return true;
  }


}
