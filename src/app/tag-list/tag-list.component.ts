import {Component, OnInit} from "@angular/core";
import { Tag } from "../models/tag";
import {FriendlyApiService} from "../services/friendlyapi.service";
import {fadeIn} from "../animations";


@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  animations: [ fadeIn ]
})
export class TagList implements OnInit {

  tags: Tag[] = [];
  newTag: Tag = new Tag();
  savingTag: boolean = false;
  deletingTag: boolean = false;

  constructor(private friendlyApiService: FriendlyApiService) { }

  ngOnInit() {
    this.friendlyApiService.getTags().then(tags => this.tags = tags);
  }

  saveTag(tag: Tag) {
    this.savingTag = true;
    this.friendlyApiService.saveTag(tag).then(res => {
      this.friendlyApiService.getTags().then(tags => { this.tags = tags; this.savingTag = false; this.newTag = new Tag(); });
    })
  }
  deleteTag(tag: Tag) {
    this.deletingTag = true;
    this.friendlyApiService.deleteTag(tag).then(res => {
      this.friendlyApiService.getTags().then(tags => { this.tags = tags; this.deletingTag = false; });
    })
  }
}
