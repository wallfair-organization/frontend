import Controller from "./controller/index.js";
import Model from "./model/index.js";
import View from "./view/index.js";

/** @class Game
 * Basically Game is a component with its own controller, model and view.
 * All logic goes in controller class. The Game itself acts as wrapper and has some API
 * */
export default class Game {
  constructor() {
    this.controller = null;
    this.gameConfig = null;
    this.viewResources = null;
  }

  initialize(handlers) {
    this.controller = new Controller();
    this.controller.initialize(new Model(), new View(), handlers);
    this.controller.on("restartGame", this.restartGame, this);
  }

  clickCell(props) {
    return this.controller.onClickOnCell(props)
  }
  /** As game is being restarted use original data again.
   * Dispatch dummy event to make LayoutManager does its work */
  restartGame() {
    this.useConfig(this.gameConfig);
    this.setResources(this.viewResources);
    this.run();
    const event = new Event("resize");
    window.dispatchEvent(event);
  }

  useConfig(config) {
    this.gameConfig = config;
    this.controller.useConfig(config);
  }

  setResources(res) {
    this.viewResources = res;
    this.controller.setResources(res);
  }

  resize(sizes) {
    this.controller.resize(sizes);
  }

  update(delta) {
    this.controller.update(delta);
  }

  run() {
    this.controller.run();
  }
}
