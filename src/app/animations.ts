import {trigger, state, style, transition, animate} from "@angular/core";
/**
 * Created by ile on 10/4/16.
 */


export const fadeIn =  trigger('fadeIn', [
    state("on", style({ background: "green" })),
    state("off", style({ background: "grey" })),
  /*  transition("on => off", animate(250)),
    transition("on <=> off", animate(250)),
    transition("on => off, off => void", animate(250)),

    */
    transition("void => *", [
      style({ opacity: 0 }),
      animate(250)
    ])
  ]);

export const recipeFade =  trigger('recipeFade', [
  state("on", style({ background: "green" })),
  state("off", style({ background: "grey" })),
  /*  transition("on => off", animate(250)),
   transition("on <=> off", animate(250)),
   transition("on => off, off => void", animate(250)),

   */
  transition("void => *", [
    style({opacity: 0}),
    animate(250)
  ]),

]);

