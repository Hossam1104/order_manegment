import { trigger, state, style, transition, animate, group } from '@angular/animations';

export const UIAnimations = {
  // Add to cart flyup reveal
  fadeSlideInOut: trigger('fadeSlideInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('250ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(10px)' }))
    ])
  ]),
  
  // Card hover lift and image zoom
  cardHoverZoom: trigger('cardHoverZoom', [
    state('default', style({ transform: 'scale(1)' })),
    state('hovered', style({ transform: 'scale(1.05)' })),
    transition('default <=> hovered', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
  ]),

  // Cart item enter/leave list animations
  listAnimation: trigger('listAnimation', [
    transition(':enter', [
      style({ opacity: 0, height: 0 }),
      group([
        animate('250ms ease-out', style({ height: '*' })),
        animate('300ms 100ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, height: 0 }))
    ])
  ])
};
