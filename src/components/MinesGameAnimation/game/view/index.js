import { Factory } from "../../sources/libs/index.js";
import Cell from "./Cell.js";
import Popup from "./Popup.js";
import Header from "./Header.js";
import { isMobile } from 'react-device-detect';

/**
 * @class View
 * @extends PIXI.Container
 * Game's View
 * */
export default class View extends Factory.Container {
  constructor() {
    super();

    this.pointersIDs = [];
    this.isPointerdown = false;
    this.isFlagRequested = false;
    this.flagTimeout = 0;
    this.timePassed = 0;

    this.viewConfig = null;
    this.grid = null;
    this.resPack = null;
    this.popUp = null;
    this.header = null;

    this.isPause = true;
    this.isGameOver = false;
    this.gameStatus = false;
  }

  setResources(res) {
    this.resPack = res;
  }

  setViewData(data) {
    this.viewConfig = data;
    const { timing } = data;
    this.flagTimeout = timing.flagRequestTimeout;
    this.popupTimout = timing.popupTimeout;
  }

  /** Resize hook which is being called while window resizing
   * @param {Number} width - renderer view width
   * @param {Number} height - renderer view height */
  resize({ width, height }) {
    const isLandscape = width > height;
    const currHeight = isLandscape ? width : height;
    //this.header.y = -( currHeight - this.header.height - 100 ) / 2;
  }

  /** @param {Number} delta time which is set by PIXI.Tiker*/
  update(delta = 1) {
    if ( this.isPause ) return;
    /* To make sure that it was long tap to reveal the cell
    * timePassed must be less than flagTimeout */
    if ( this.isPointerdown ) {
      this.timePassed += ( delta * 16.777 ); // to convert it to ms
      this.isFlagRequested = ( this.timePassed > this.flagTimeout );
    }

    if ( this.isGameOver ) {
        this.pause();
        // this.resume();
        this.emit("restartGame");
    }

    //this.header.update(delta);
  }

  /** To create header of the game. It has 2 counters:
   * one for time, the second show flags available */
  createHeader() {
    return;
    const { header, flags } = this.viewConfig;

    this.header = new Header({ header, textures: this.resPack });
    this.header.on("menuClick", this.onMenuClick, this);
    this.header.updateTimeNumber();

    this.updateFlagsNumber(flags);
    this.addChild(this.header);
  }

  /** To react on user's actions and update header counter
   * @param {Number} number - number of flags which is left */
  updateFlagsNumber(number) {
    return;
    this.header.updateFlagsNumber(number);
  }

  /** To react to a user's actions. As a user clicks on the menu
   * we can have 2 options available */
  onMenuClick() {
    this.pause();

    this.createPopup("menu", (name) => {
      switch ( name ) {
        case "restartGame": this.emit("restartGame");
          break;
        case "continueGame":
          this.removePopup();
          this.resume();
          break;
      }
    });
  }

  /** To show pup-up at the end of the game as a user loses*/
  showPopUp() {
    this.pause();
    this.createPopup(this.gameStatus, () => {
      this.emit("restartGame");
    });
  }

  /** To create popup by its name, so there can be some number of popups
   * Use a callback function to make interactivity dynamic
   * @param {String} name - name of popup type in config
   * @param {Function} cb */
  createPopup(name, cb) {
    const { popups } = this.viewConfig;
    const config = popups[ name ];
    this.popUp = Popup.fromConfig(popups, config, cb);

    this.addChild(this.popUp);
  }

  /** To remove pop-up */
  removePopup() {
    this.removeChild(this.popUp);
    this.popUp = null;
  }

  /** To create actual grid of cells
   * @param {Object} model data for the grid */
  creteGrid({ collection, rows, columns, gridSize }) {
    this.grid = new Factory.Container();
    
    const texture = this.resPack.get("closed");

    const { width, height } = texture;
    const gridWidth = ( ( columns * width ) - width );
    const gridHeight = ( ( rows * height ) - height );
    if(isMobile) {
      //this.grid.x = 8;
      gridSize = 240;
    }  
    this.grid.scale.set(gridSize / gridWidth);
    this.addChild(this.grid);

    this.grid.cells = collection.map((row, i) => {
      return row.map((cellModel, j) => {
        const x = -( gridWidth / 2 ) + ( width * j );
        const y = -( gridHeight / 2 ) + ( height * i );
        const cell = new Cell(texture, cellModel);
        cell.position.set(x, y);
        cell.position.set(x, y);
        //cell.on("mouseover", this.onMouseOver, this);
        //cell.on("mouseout", this.onMouseOut, this);
        cell.interactive=true;
        return cell;
      });
    });

    this.grid.cells.forEach(row => {
      row.forEach(cell => this.grid.addChild(cell));
    });


  }

  updateGrid(row, col, isMine) {
    this.grid.cells[col][row].isMine = isMine;
    this.grid.cells[col][row].isRevealed = true;
  }

  /** To pause the game. It removes all interactivity and stops the counter */
  pause() {
    this.isPause = true;
    this.removeInteractivity();
    //this.header.removeInteractivity();
  }

  /** To resume the game */
  resume() {
    this.isPause = false;
    this.addInteractivity();
    //this.header.addInteractivity();
  }

  /** Turn interactivity on for mobile devices and PC separately */
  addInteractivity() {
    this.grid.interactive = true;
    /* device events */
    this.grid.on("touchstart", this.onTouchStart, this);
    this.grid.on("touchend", this.onTouchEnd, this);

    /* PC events */
    this.grid.on("click", this.onClick, this);

  }

  /** Turn all interactivity off */
  removeInteractivity() {
    this.grid.interactive = false;
    this.grid.off("touchstart", this.onTouchStart, this);
    this.grid.off("touchend", this.onTouchEnd, this);
    this.grid.off("click", this.onClick, this);
    this.grid.off("rightclick", this.onRightClick, this);
  }

  /** For touch start event on mobile devices
   * @param {Event} */
  onTouchStart({ data }) {
    if ( this.isPointerdown ) return;
    this.isPointerdown = true;

    this.pointersIDs.push(data.pointerId);
  }

  /** For touch end event on mobile devices
   * @param {Event} */
  onTouchEnd({ data }) {
    if ( !this.pointersIDs.includes(data.pointerId) ) return;
    this.isPointerdown = false;
    this.pointersIDs = [];
    this.timePassed = 0;

    const { x, y } = data.getLocalPosition(this.grid);
    const { row, col } = this.convertLocToIndex(x, y);

      this.emit("clickOnCell", { row, col });
  }

  /** For mouse left click on PC
   *  @param {Event} */
  onClick({ data }) {
    const { x, y } = data.getLocalPosition(this.grid);
    const { row, col } = this.convertLocToIndex(x, y);
    this.emit("clickOnCell", { row, col });
  }

  /** For mouse right click on PC
   *  @param {Event} */
  onRightClick({ data }) {
    return;
    const { x, y } = data.getLocalPosition(this.grid);
    const { row, col } = this.convertLocToIndex(x, y);
    this.emit("flagRequested", { row, col });
  }
  onMouseOver({ data }) {
    const { x, y } = data.getLocalPosition(this.grid);
    const { row, col } = this.convertLocToIndex(x, y);
    this.emit("overOnCell", { row, col });
  }
  onMouseOut({ data }) {
    const { x, y } = data.getLocalPosition(this.grid);
    const { row, col } = this.convertLocToIndex(x, y);
    this.emit("outOnCell", { row, col });
  }

  /** To convert coordinated where user has clicked to an actual row and col of
   * a cell on the grid
   * @param {Number} x - x coordinate of a touch / click
   * @param {Number} y - y coordinate of a touch / click
   * @return {Object} {row, col} converted data */
  convertLocToIndex(x, y) {
    const { width, height, cells, scale } = this.grid;

    const rows = cells.length;
    const columns = cells[ 0 ].length;

    const yPitch = height / rows;
    const xPitch = width / columns;

    const translatedX = ( width / 2 ) + ( x * scale.x );
    const translatedY = ( height / 2 ) + ( y * scale.y );

    const row = Math.floor(translatedY / yPitch);
    const col = Math.floor(translatedX / xPitch);

    return { row, col };
  }

  /** To reveal all cells which were collected by engine
   * @param {Array} cells */
  revealCells(cells) {
    cells.forEach(({ row, col }) => {
      const cell = this.grid.cells[ row ][ col ];
      cell.reveal(this.resPack, this.viewConfig.styles, this.viewConfig.handlers);
    });
  }
  /** To reveal all cells which were collected by engine
   * @param {Array} cells */
   overCell(cells) {
    cells.forEach(({ row, col }) => {
      const cell = this.grid.cells[ row ][ col ];
      cell.scale.set(1.1);
    });
  }
/** To reveal all cells which were collected by engine
   * @param {Array} cells */
 outCell(cells) {
  cells.forEach(({ row, col }) => {
    const cell = this.grid.cells[ row ][ col ];
    cell.scale.set(1);
  });
}
  /** Toggle a single cell (not) to be flagged
   * @param {Number} row
   * @param {Number} col */
  toggleCellFlag(row, col) {
    const cell = this.grid.cells[ row ][ col ];
    cell.toggleFlag(this.resPack);
  }

  /** To set flags on cells
   * @param {Array} cells */
  flagMines(cells) {
    cells.forEach(({ row, col }) => {
      this.toggleCellFlag(row, col);
    });
  }

  /** To disable view class at the end of the game
   * @param {String} gameStatus*/
  gameOver(gameStatus) {
    this.removeInteractivity();
    this.gameStatus = gameStatus;
    this.isGameOver = true;
  }

  /** To clean view data before destroying */
  cleanView() {
    this.grid.removeChildren();
    this.removeChildren();

    this.pointersIDs = [];
    this.isPointerdown = false;
    this.isFlagRequested = false;
    this.flagTimeout = 0;
    this.timePassed = 0;

    this.viewConfig = null;
    this.grid = null;
    this.resPack = null;
    this.popUp = null;

    this.isGameOver = false;
    this.gameStatus = false;
  }
}
