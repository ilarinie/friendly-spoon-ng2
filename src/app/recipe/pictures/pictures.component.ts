import {Component, OnInit} from "@angular/core";
import {Input} from "@angular/core";
import {Recipe} from "../../models/recipe";
import {RecipePicture} from "../../models/recipe_picture";
import {FriendlyApiService} from "../../services/friendlyapi.service";
import {DragulaService} from "ng2-dragula/components/dragula.provider";
import {Global} from "../../globals";
/**
 * Created by ile on 9/25/16.
 */


@Component({
  selector: 'recipe-pictures',
  templateUrl: 'pictures.component.html',
  styleUrls: ['pictures.component.css'],
  viewProviders: [DragulaService]
})
export class Pictures implements OnInit{
  @Input()
  recipe: Recipe;

  pictures: RecipePicture[];

  uploaded: any;

  loading: boolean = false;
  fileName: string = "";

  //baseUrl: string = "http://localhost:3000/";
  baseUrl: string = Global.apiUrl;

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
    this.loading = true;
    this.fileName = file.name;


    myReader.onloadend = (e) => {
      this.uploaded = myReader.result;
      this.loading = false;
    }
    myReader.readAsDataURL(file);
  }

  changeCoverPicture(picture_id){
    this.recipe.cover_picture_id = picture_id;
    let savedRecipe = new Recipe();
    savedRecipe.id = this.recipe.id;
    savedRecipe.cover_picture_id = picture_id;
    this.friendlyApiService.save(savedRecipe);
  }

  uploadPic(){
    let pic: RecipePicture = new RecipePicture();
    pic.recipe_id = this.recipe.id;
    pic.picture = this.uploaded;
    this.friendlyApiService.uploadPicture(pic).then(pic => {
      if (this.pictures.length == 0){
        this.changeCoverPicture(pic.id);
      }
      this.pictures.push(pic);

    });
  }
  deletePic(picture: RecipePicture){
    let index = this.pictures.indexOf(picture);
    if ( index > -1){
      this.pictures.splice(index,1);
    }
    if (picture.id == this.recipe.cover_picture_id){
      if  (this.pictures.length == 0){
        this.changeCoverPicture(null);
      }else {
        this.changeCoverPicture(this.pictures[0].id);
      }

    }
    this.friendlyApiService.deletePicture(picture);
  }


}
