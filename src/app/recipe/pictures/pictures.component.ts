import {Component, OnInit} from "@angular/core";
import {Input} from "@angular/core";
import {Recipe} from "../../models/recipe";
import {RecipePicture} from "../../models/recipe_picture";
import {FriendlyApiService} from "../../services/friendlyapi.service";
import {DragulaService} from "ng2-dragula/components/dragula.provider";
/**
 * Created by ile on 9/25/16.
 */


@Component({
  selector: 'recipe-pictures',
  templateUrl: 'pictures.component.html',
  styleUrls: ['../add-ingredients/dragula.min.css'],
  viewProviders: [DragulaService]
})
export class Pictures implements OnInit{
  @Input()
  recipe: Recipe;

  pictures: RecipePicture[];

  uploaded: any;

  constructor(private friendlyApiService: FriendlyApiService, private dragulaService: DragulaService){}

  ngOnInit(){
    this.pictures = this.recipe.recipe_pictures;
  }

  changeListener($event){
    this.readThis($event.target);
  }
  readThis(inputValue: any){
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.uploaded = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  uploadPic(){
    let pic: RecipePicture = new RecipePicture();
    pic.recipe_id = this.recipe.id;
    pic.picture = this.uploaded;
    this.friendlyApiService.uploadPicture(pic).then(pic => this.pictures.push(pic));
  }
  deletePic(picture: RecipePicture){
    let index = this.pictures.indexOf(picture);
    if ( index > -1){
      this.pictures.splice(index,1);
    }
    this.friendlyApiService.deletePicture(picture);
  }


}
