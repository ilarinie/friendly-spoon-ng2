import { Pipe, Injectable, PipeTransform } from "@angular/core";
import {PipeDecorator} from "@angular/core/src/metadata/directives";

@Pipe({
  name: "filter",
  pure: false
})
export class FilterArrayPipe implements PipeTransform {
  transform(items: any[], queryString: string): any {
    if (items == null) {
      return null;
    }
    let regex = new RegExp(queryString, "i");
    return items.filter((recipe) => new RegExp(queryString, "i").test(recipe.name));
    /*return items.filter((recipe) => function(val) {
      return regex.test(recipe.name) || regex.test(recipe.instruction);
    })*/
  }
}

@Pipe({
  name: "reverseFilter",
  pure: false
})
export class ReverseArrayPipe implements PipeTransform {
  transform(items: any[], queryString: string): any {
    if (items == null || queryString == "" || queryString == undefined) {
      return null;
    }
    //Sortataan ainekset aakkosiin
    items.sort(this.compare);

    //Ensin kokeillaan onko 100% matchia etsintään
    let strictQuery = '^'+queryString+'$';
    let strictitems = items.filter((recipe) => new RegExp(strictQuery, "i").test(recipe.name));
    //palautetaan jos on
    if (strictitems.length != 0){
      return strictitems;
    }
    //Jos ei 100% matchia, testataan onko matchia ainesosan nimen alkuun
    let secondaryQuery = '^'+queryString;
    let secondaryItems = items.filter((recipe) => new RegExp(secondaryQuery, "i").test(recipe.name));
    if (secondaryItems.length != 0){
      return secondaryItems.slice(0,1);
    }

    //jos kumpaakaan ei löydy, filteröidään löysästi
    items = items.filter((recipe) => new RegExp(queryString, "i").test(recipe.name));
    return items.slice(0, 1);
  }

  compare(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
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
      case "date":
        items.sort(this.byDate);
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
      case "datereverse":
        items.sort(this.byDate);
        return items.reverse();
      case "indexinmukaan":
        items.sort(this.byIndex);
        return items;
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
      return -1;
    }
    if (b.ratingaverage == null) {
      return 1;
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
  byIndex(a, b) {
    if (a.index == null) {
      return 1;
    }
    if (b.index == null) {
      return -1;
    }
    return a.index - b.index;
  }
  byDate(a, b){
    if (a.created_at == null) {
      return 1;
    }
    if (b.created_at == null) {
      return -1;
    }
    let datea:Date = new Date(a.created_at);
    let dateb:Date = new Date(b.created_at);

    if (datea > dateb){
      return 1;
    } else if (dateb > datea){
      return -1;
    } else {
      return 0;
    }

  }
}
@Pipe({
  name: "fractioner",
  pure: false
})
export class Fractioner implements PipeTransform {
  transform(value:number, multiplier:number){
    value = value*multiplier;
    return this.fraction(value);
  }

  fraction(decimal){

  if(!decimal){
    return decimal;
  }
  var whole = String(decimal).split('.')[0];
  decimal = parseFloat("."+String(decimal).split('.')[1]);
  var mum = "1";
  for(let z=0; z<String(decimal).length-2; z++){
    mum += "0";
  }
  var num;
  num = parseInt(mum);
  decimal = decimal*num;

  for(var z=2; z<decimal+1; z++){
    if(decimal%z==0 && num%z==0){
      decimal = decimal/z;
      num = num/z;
      z=2;
    }
  }
  //if format of fraction is xx/xxx
  if (decimal.toString().length == 2 &&
    num.toString().length == 3) {
    //reduce by removing trailing 0's
    decimal = Math.round(Math.round(decimal)/10);
    num = Math.round(Math.round(num)/10);
  }
  //if format of fraction is xx/xx
  else if (decimal.toString().length == 2 &&
    num.toString().length == 2) {
    decimal = Math.round(decimal/10);
    num = Math.round(num/10);
  }
  //get highest common factor to simplify
    var t = this.HCF(decimal, num);

  //return the fraction after simplifying it
    if (decimal == 0 || isNaN(decimal)){
      return whole;
    }
    else if (whole=="0"){
      return "<sup>"+decimal+"</sup>&frasl;<sub>"+num+"</sub>"
    }
    else {
      return whole+" "+"<sup>"+decimal+"</sup>&frasl;<sub>"+num+"</sub>"
    }

}

  HCF(u, v) {
  var U = u, V = v
  while (true) {
    if (!(U%=V)) return V
    if (!(V%=U)) return U
  }
}

}
