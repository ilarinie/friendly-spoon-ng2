import { Pipe, Injectable, PipeTransform } from "@angular/core";

@Pipe({
    name: "filter",
    pure: false
})
export class FilterArrayPipe implements PipeTransform {
    transform(items: any[], queryString: string): any {
        if (items == null) {
            return null;
        }
        return items.filter((recipe) => new RegExp(queryString, "i").test(recipe.name));
    }
}

@Pipe({
    name: "reverseFilter",
    pure: false
})
export class ReverseArrayPipe implements PipeTransform {
    transform(items: any[], queryString: string): any {
        if (items == null || queryString == "") {
            return null;
        }
        items.sort(this.compare);
        items = items.filter((recipe) => new RegExp(queryString, "i").test(recipe.name));
        return items.slice(0, 1);
    }

    compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
}
@Pipe({
    name: "tagFilter",
    pure: false
})
export class TagFilter implements PipeTransform {
    transform(items: any[], queryString: string): any {
        if (items == null) {
            return null;
        }
        if (queryString = "") {
            return items;
        }
        console.log("dapper " + queryString)

        return items.filter(filterByTags);

        function filterByTags(recipe) {
            if (recipe.recipe_tags == null || recipe.recipe_tags.lenght == 0) {
                return false;
            }
            for (let i = 0; i < recipe.recipe_tags.length; i++) {

                if (new RegExp(queryString, "i").test(recipe.recipe_tags[i].title)) {
                    console.log("asd" + queryString);
                    return true;

                }
            }
            return false;
        }

    }
    compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

}





@Pipe({
    name: "orderBy",
    pure: false
})
export class OrderBy implements PipeTransform {
    transform(items: any[], queryString: string): any {
        if (items == null) {
            return null;
        }
        if (queryString == "") {
            return items;
        }
        switch (queryString) {
            case "name":
                items.sort(this.byName);
                return items;
            case "rating":
                items.sort(this.byRating);
                return items;
            case "time":
                items.sort(this.byTime);
                return items;
            case "namereverse":
                items.sort(this.byName);
                return items.reverse();
            case "ratingreverse":
                items.sort(this.byRating);
                return items.reverse();
            case "timereverse":
                items.sort(this.byTime);
                return items.reverse();
            default:
                return items;
        }

    }
    byTime(a, b) {
        if (a.duration == null) {
            return 1;
        }
        if (b.duration == null) {
            return -1;
        }
        return a.duration.id - b.duration.id;
    }
    byRating(a, b) {
        if (a.ratingaverage == null) {
            return 1;
        }
        if (b.ratingaverage == null) {
            return -1;
        }
        return a.ratingaverage - b.ratingaverage;
    }
    byName(a, b) {
        if (a.name == null) {
            return 1;
        }
        if (b.name == null) {
            return -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    }
}