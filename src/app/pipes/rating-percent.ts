import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'ratingimg',
    pure: false
})
export class RatingPercentPipe implements PipeTransform {

    transform(value:number){
        if (value < 2){
            return '<img src="assets/1-rating.png">'
        } else if (value < 3){
            return '<img src="assets/2-rating.png">'
        }else if (value < 4){
            return '<img src="assets/2-rating.png">'
        }else if (value < 5){
            return '<img src="assets/2-rating.png">'
        } else {
            return '<img src="assets/2-rating.png">'
        }
    }

}