import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'fractionize'
})
export class FractionizePipe implements PipeTransform {

    public static denominatorMap=[];
    private tolerance = .01;

    transform(text:any, multiplier:number, maxDenominator=64): string {
        if (FractionizePipe.denominatorMap.length < maxDenominator) {
            FractionizePipe.createDenominatorMap(maxDenominator);
        }

        var v = text;
        if (typeof v !== "number") {
            v = Number(v);  
            v = v*multiplier;
        }

        if (isNaN(v)) {
            return text;
        }

        var decimalPortion = v%1;
        var integerPortion = Math.floor(v);
        for (var i=0;i<maxDenominator;i++) {
            for (var j=0;j<FractionizePipe.denominatorMap[i].length;j++) {
                if (decimalPortion === FractionizePipe.denominatorMap[i][j]) {
                    return this.formatResult(integerPortion, j+1,i+1);
                }
            }
        }

        for (var i=0;i<maxDenominator;i++) {
            for (var j=0;j<FractionizePipe.denominatorMap[i].length;j++) {
                if (decimalPortion + this.tolerance > FractionizePipe.denominatorMap[i][j] &&
                    decimalPortion - this.tolerance < FractionizePipe.denominatorMap[i][j]) {
                    return this.formatResult(integerPortion, j+1,i+1);
                }
            }
        }

        return v;
    }

    static createDenominatorMap(maxDenominator:number) {
        while (FractionizePipe.denominatorMap.length < maxDenominator) {
            var currentDenominator = FractionizePipe.denominatorMap.length+1;
            var m = [];
            for (var i=1;i<= currentDenominator;i++) {
                m.push(i/currentDenominator);
            }
            FractionizePipe.denominatorMap.push(m);
        }
    }

    formatResult(integerPortion, numerator, denominator) {
        let htmlString = '';
        if (integerPortion){
          htmlString = htmlString+integerPortion;
        }
        if( numerator) {
          htmlString = htmlString+" <sup>"+numerator+"</sup>&frasl;<sub>"+denominator+"</sub>"
        }
        return htmlString;
    }
}