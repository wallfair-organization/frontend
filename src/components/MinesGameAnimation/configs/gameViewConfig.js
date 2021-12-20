export default {
  "header": {
    "type": "rect",
    "width": 0,
    "height": 0,
    "radius": 20,
    "color": 0xe3e4e4,

    "timer": {
      "type": "rect",
      "width": 180,
      "height": 100,
      "radius": 2,
      "color": 0x5c1e1a,
      "position": { "x": 300, "y": 0 }
    },
    "flagsCounter": {
      "type": "rect",
      "width": 180,
      "height": 100,
      "radius": 2,
      "color": 0x5c1e1a,
      "position": { "x": -300, "y": 0 }
    },
    "menuButton": {
      "type": "rect",
      "width": 250,
      "height": 100,
      "radius": 25,
      "color": 0x3d3af0,
      "position": { "x": 0, "y": 0 },

      "styles": {
        "fill": "#ffffff",
        "fontFamily": "Helvetica",
        "fontSize": 60,
        "position": { "x": 0, "y": 0 }
      },
      "text": "Menu"
    }
  },
  "styles": {
    "common": {
      "fontFamily": "Helvetica",
      "fontSize": 70,
      "fontWeight": "bold"
    },
    "1": {
      "fill": "#0328fc"
    },
    "2": {
      "fill": "#3ec408"
    },
    "3": {
      "fill": "#fa2828"
    },
    "4": {
      "fill": "#06052e"
    },
    "5": {
      "fill": "#000000"
    }
  },
  "popups": {
    "popupBackground": {
      "type": "rect",
      "width": 600,
      "height": 800,
      "radius": 25,
      "color": 0xffffff,
      "position": { "x": 0, "y": 0 }
    },
    "popupStyles": {
      "align": "center",
      "breakWords": true,
      "fill": "#3d3af0",
      "fontFamily": "Helvetica",
      "fontSize": 65,
      "wordWrap": true,
      "wordWrapWidth": 550
    },
    "start": {
      "text": "Mine and win",
      "position": { "x": 0, "y": -100 },
      "buttons": [ {
        "type": "rect",
        "width": 400,
        "height": 120,
        "radius": 25,
        "color": 0x3d3af0,
        "position": { "x": 0, "y": 300 },
        "event": "startGame",
        "styles": {
          "fill": "#ffffff",
          "fontFamily": "Helvetica",
          "fontSize": 60,
          "position": { "x": 0, "y": 0 }
        },
        "text": "Start!"
      } ]
    },
    "lose": {
      "text": "Sorry",
      "position": { "x": 0, "y": -100 },
      "buttons": [ {
        "type": "rect",
        "width": 400,
        "height": 120,
        "radius": 25,
        "color": 0x3d3af0,
        "position": { "x": 0, "y": 300 },
        "event": "restartGame",
        "styles": {
          "fill": "#ffffff",
          "fontFamily": "Helvetica",
          "fontSize": 60,
          "position": { "x": 0, "y": 0 }
        },
        "text": "Try Again?"
      } ]
    },
    "win": {
      "text": "Well done! \nYou are great Minesweeper!",
      "position": { "x": 0, "y": -100 },
      "buttons": [ {
        "type": "rect",
        "width": 400,
        "height": 120,
        "radius": 25,
        "color": 0x3d3af0,
        "position": { "x": 0, "y": 300 },
        "event": "restartGame",
        "styles": {
          "fill": "#ffffff",
          "fontFamily": "Helvetica",
          "fontSize": 60,
          "position": { "x": 0, "y": 0 }
        },
        "text": "Try Again?"
      } ]
    },
    "menu": {
      "text": "",
      "position": { "x": 0, "y": -130 },
      "buttons": [
        {
          "type": "rect",
          "width": 400,
          "height": 120,
          "radius": 25,
          "color": 0x3d3af0,
          "position": { "x": 0, "y": 300 },
          "event": "restartGame",
          "styles": {
            "fill": "#ffffff",
            "fontFamily": "Helvetica",
            "fontSize": 60,
            "position": { "x": 0, "y": 0 }
          },
          "text": "Exit To Menu"
        },
        {
          "type": "rect",
          "width": 400,
          "height": 120,
          "radius": 25,
          "color": 0x3d3af0,
          "position": { "x": 0, "y": 150 },
          "event": "continueGame",
          "styles": {
            "fill": "#ffffff",
            "fontFamily": "Helvetica",
            "fontSize": 60,
            "position": { "x": 0, "y": 0 }
          },
          "text": "Continue"
        }
      ]
    }
  }
};
