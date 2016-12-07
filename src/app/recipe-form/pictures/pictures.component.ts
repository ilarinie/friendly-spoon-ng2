import {Component, OnInit, ViewChild} from "@angular/core";
import {Input} from "@angular/core";
import {Recipe} from "../../models/recipe";
import {RecipePicture} from "../../models/recipe_picture";
import {FriendlyApiService} from "../../services/friendlyapi.service";
import {DragulaService} from "ng2-dragula/components/dragula.provider";
import {Global} from "../../globals";
import {Observable} from "rxjs";
/**
 * Created by ile on 9/25/16.
 */


@Component({
  selector: 'recipe-pictures',
  templateUrl: 'pictures.component.html',
  styleUrls: ['pictures.component.scss'],
  viewProviders: [DragulaService]
})
export class Pictures implements OnInit {
  @Input()
  recipe: Recipe;

  @ViewChild('selectedImage') selectedImage;

  pictures: RecipePicture[];

  uploaded: any;

  loading: boolean = false;
  fileName: string = "";

  author: string = localStorage.getItem('username');

  input: any;

  baseUrl: string = Global.apiUrl;
  file_src: string = "";
  private saving: boolean = false;
  private tickDuration;
  private ticks;
  constructor(private friendlyApiService: FriendlyApiService, private dragulaService: DragulaService) { }

  ngOnInit() {
    this.pictures = this.recipe.recipe_pictures;
  }

  changeListener($event) {
    this.readThis($event.target);
  }
  readThis(inputValue: any) {
    this.input = inputValue;
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    this.loading = true;
    this.fileName = file.name;


    myReader.onloadend = (e) => {
      console.log(file.size + " size")
      this.tickDuration = (file.size / 180000) / 100;
      this.uploaded = myReader.result;
      this.loading = false;
      this.selectedImage.nativeElement.value = '';
    }
    myReader.readAsDataURL(file);
  }

  changeCoverPicture(picture_id) {
    this.recipe.cover_picture_id = picture_id;
    let savedRecipe = new Recipe();
    savedRecipe.id = this.recipe.id;
    savedRecipe.cover_picture_id = picture_id;
    this.friendlyApiService.save(savedRecipe);
  }

  uploadPic() {
    this.saving = true;
    this.ticks = 0;
    let timer = Observable.timer(0, this.tickDuration * 1000);
    timer.subscribe(t => { this.ticks = t; });


    let pic: RecipePicture = new RecipePicture();
    pic.recipe_id = this.recipe.id;
    pic.picture = this.uploaded;
    pic.author = this.author;
    this.friendlyApiService.uploadPicture(pic).then(pic => {
      if (this.pictures.length == 0) {
        this.changeCoverPicture(pic.id);
      }
      localStorage.setItem('listLoaded', null);
      this.pictures.push(pic);
      this.ticks = 100;
      this.saving = false;
      this.input.files = null;
    });
  }
  deletePic(picture: RecipePicture) {
    let index = this.pictures.indexOf(picture);
    if (index > -1) {
      this.pictures.splice(index, 1);
    }
    if (picture.id == this.recipe.cover_picture_id) {
      if (this.pictures.length == 0) {
        this.changeCoverPicture(null);
      } else {
        this.changeCoverPicture(this.pictures[0].id);
      }
      localStorage.setItem('listLoaded', null);

    }
    this.friendlyApiService.deletePicture(picture);
  }


}
