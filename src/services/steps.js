/*
steps :
  0  : lang choice and wait for hand click
  1  : scan
  2  : wait for area selection
  3x : show area description
  4x : intro area video (modal opening)
  5x : video
  6x : close video
*/

const steps = [
  { //lang choice and wait for hand click
    start: 0,
    loop: 18
  },
  { //scan
    start: 18,
    next: 24
  },
  { // wait for area selection
    start: 24.14,
    loop: 33
  },
  [ //show area description
    { //Pulpe des doigts
      start: 33.03,
      stop: 35.01
    },
    { //Grand croissant
      start: 53.24,
      stop: 55
    },
    { //Coeur de la paume
      start: 63.07,
      stop: 64.03
    },
    { //Mont de Venus
      start: 72.13,
      stop: 73.04
    },
    { //Talon de la main
      start: 80.20,
      stop: 81.32
    },
  ],
  [ //modal opening
    { //Pulpe des doigts
      start: 35.13,
      next: 36.02
    },
    { //Grand croissant
      start: 55.18,
      next: 56.05
    },
    { //Coeur de la paume
      start: 64.33,
      next: 61
    },
    { //Mont de Venus
      start: 74,
      next: 74.12
    },
    { //Talon de la main
      start: 82.00,
      next: 82.12
    },
  ],
  [ //video
    { //Pulpe des doigts
      start: 36.02,
      stop: 49.16
    },
    { //Grand croissant
      start: 56.05,
      stop: 61.02
    },
    { //Coeur de la paume
      start: 64.5,
      stop: 70.01
    },
    { //Mont de Venus
      start: 74.12,
      stop: 78.06
    },
    { //Talon de la main
      start: 82.12,
      stop: 88.19
    },
  ],
  [ //modal closing
    { //Pulpe des doigts
      start:  50.03,
      next: 50.24
    },
    { //Grand croissant
      start:  61.17,
      next: 62.17
    },
    { //Coeur de la paume
      start:  70.15,
      next: 71.15
    },
    { //Mont de Venus
      start:  78.18,
      next: 79.13
    },
    { //Talon de la main
      start:  89.09,
      next: 90.05
    },
  ]
];


export {
  steps
}