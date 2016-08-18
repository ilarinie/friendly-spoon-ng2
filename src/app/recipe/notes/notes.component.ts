import { Component, Input } from "@angular/core";
import { FriendlyApiService } from "../../services/friendlyapi.service";


import { Recipe } from "../../models/recipe";
import { Note } from "../../models/note";

@Component({
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.css'],
  selector: 'notes',
  moduleId: module.id
})
export class Notes {
  @Input()
  recipe: Recipe;


  error: boolean = false;

  constructor(
    private friendlyApiService: FriendlyApiService
  ) { }


  note: Note = new Note();
  starsCount: number;

  user_id = localStorage.getItem('user_id');



  saveNote() {
    this.note.recipe_id = this.recipe.id;
    this.friendlyApiService.saveNote(this.note).then(note => this.recipe.notes.push(note));
  }
  deleteNote(note: Note) {
    let index = this.recipe.notes.indexOf(note);
    if (index > -1) {
      this.recipe.notes.splice(index, 1);
    }
    this.friendlyApiService.deleteNote(note).then(res => {

    })
  }

}
