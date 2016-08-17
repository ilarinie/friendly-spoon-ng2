import { Component, Input } from "@angular/core";
import { Recipe } from "../../models/recipe";
import { Tag } from "../../models/tag";
import { RecipeTag } from "../../models/recipe_tag";

import { FriendlyApiService } from "../../services/friendlyapi.service";


@Component({
    templateUrl: 'app/recipe/tags/tags.component.html',
    styleUrls: ['app/recipe/tags/tags.component.css'],
    selector: 'add-tags'
})
export class Tags {
    @Input()
    recipe: Recipe;
    @Input("editheading")
    editheading: boolean;

    tag: Tag = new Tag();

    constructor(private friendlyApiService: FriendlyApiService) { }

    saveRecipeTag(tag: Tag) {
        let recipeTag: RecipeTag = new RecipeTag();
        recipeTag.recipe_id = this.recipe.id;
        console.log(tag.id)
        recipeTag.tag_id = tag.id;
        this.friendlyApiService.saveRecipeTag(recipeTag).then(recipeTag => this.recipe.recipe_tags.push(recipeTag));
        let index = this.recipe.allTags.indexOf(tag);
        if (index > -1) {
            this.recipe.allTags.splice(index, 1);
        }
    }
    removeRecipeTag(recipeTag: RecipeTag) {
        this.friendlyApiService.deleteRecipeTag(recipeTag);
        let index = this.recipe.recipe_tags.indexOf(recipeTag);
        this.recipe.recipe_tags.splice(index, 1)
        let tag = new Tag()
        tag.title = recipeTag.tag.title
        tag.id = recipeTag.tag.id
        this.recipe.allTags.push(tag)
    }
    saveTag() {
        this.friendlyApiService.saveTag(this.tag).then(tag => {
            let recTag = new RecipeTag();
            recTag.tag_id = tag.id;
            recTag.tag = tag;
            recTag.recipe_id = this.recipe.id;
            this.recipe.recipe_tags.push(recTag);
            this.friendlyApiService.saveRecipeTag(recTag);
        });
        this.tag = new Tag();
    }
    deleteTag() {

    }


}
