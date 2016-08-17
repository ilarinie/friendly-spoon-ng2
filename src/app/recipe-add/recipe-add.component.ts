import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../models/recipe';
import { FriendlyApiService } from '../services/friendlyapi.service';
import { Duration } from '../models/duration';
import { Level } from '../models/level';
import { Unit } from '../models/unit';

@Component({
    templateUrl: 'app/recipe-add/recipe-add.component.html'
})
export class RecipeAddComponent implements OnInit {
    @Input() recipe: Recipe;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    durations: Duration[];
    levels: Level[];
    recipes: Recipe[];
    units: Unit[];

    submitted = false;

    onSubmit() {
        this.submitted = true
    }

    get diagnostic() { return JSON.stringify(this.recipe); }

    constructor(
        private friendlyApiService: FriendlyApiService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                let id = +params['id'];
                this.friendlyApiService.getRecipe(id)
                    .then(recipe => this.recipe = recipe);

            } else {
                this.recipe = new Recipe();
            }
        })
        this.friendlyApiService.getDurations().then(durations => this.durations = durations);
        this.friendlyApiService.getLevels().then(levels => this.levels = levels);
        this.friendlyApiService.getUnits().then(units => this.units = units);
    }
    submitForm(data) {
        this.save();
    }

    save() {
        this.friendlyApiService
            .save(this.recipe)
            .then(recipe => {
                this.recipe = recipe;
                
            })
            .catch(error => this.error = error);
    }


}
