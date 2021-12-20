/**
 * @class CellModel
 * To hold cell's data separately
 * */
export default class CellModel {

  /**
   * @param {Boolean} isMine
   * @param {String} text - number of mines around
   * @param {Number} row - row index of cell in the map
   * @param {Number} col - col index of cell in the map*/
  constructor(isMine, text, row, col) {
    this.col = col;
    this.row = row;
    this.text = text;
    this.isMine = isMine;
    this.isRevealed = false;
    this.isFlagged = false;
    this.isEmpty = (!isMine && !text.trim());
  }
}