import { Loader, Emitter } from "../extensions/index.js";
import { ResPackage } from "../abstract/index.js";

/**
 * @class ResourceLoader
 * @extends Emitter
 * To load all assets for game. Loader creates a ResPackage for each component
 * */
export default class ResourceLoader extends Emitter {
  constructor() {
    super();

    this._loader = new Loader();
    this._resPackages = [];
  }

  /** Recursively load all assets
   * @param {Function} onFinishCb - as all assets are loaded this function will be called
   * @param {Function} onPackLoadedCb - this callback will be called as soon as one pack of assets is loaded
   *
   * @param {Object} currPack - a pack of assets for one component
   * @param {Array<Object>} nextPacks - array of packs for the rest of components
   * */
  runLoader(onFinishCb, onPackLoadedCb, [ currPack, ...nextPacks ] = this.resPackages) {
    if ( !currPack ) {
      onFinishCb();
      return;
    }

    currPack.resources.forEach(({ name, url }) => this.loader.add(name, url));

    this.loader.load((loader, resources) => {
      const textures = Object.values(resources)
        .map(({ name, texture }) => ( [name, texture] ));

      onPackLoadedCb(new ResPackage(currPack.name, textures));

      this.runLoader(onFinishCb, onPackLoadedCb, nextPacks);
    });
  }

  /** To get Loader
   * @return {Loader} */
  get loader() {
    return this._loader;
  }

  /** To get all resources for the game
   * @return {Array} */
  get resPackages() {
    return this._resPackages;
  }

  /** To set all resources for the game
   * @param {Array} res */
  set resPackages(res) {
    this._resPackages = res;
  }
}