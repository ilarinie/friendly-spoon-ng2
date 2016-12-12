import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'ratingpercent',
    pure: false
})
export class RatingPercentPipe implements PipeTransform {

    transform(value:number){
        let percent = Math.floor(value * 20);
        let color = "";
        let part = (percent > 50) ? Math.floor(255 * ((100 - percent) / 100)) : Math.floor(255 * (percent / 100));

        console.log(part + " part");
        if (percent < 50) {
            color = "(255," + part + ",0)"
        }
        else if ( percent > 50){
            color = "(" + part +",255, 0)";
        }
        else {
            color = "(255,255,0)";
        }
        console.log(color + " color");

        return '<span [style.color]="rgb'+ color +'">' + percent + ' %</span>'
    }

}