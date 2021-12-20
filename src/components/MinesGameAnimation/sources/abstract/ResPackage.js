export default class ResPack {
  constructor(name = "ResPack", textures = []) {
    this._name = name;
    this._textures = new Map(textures);
  }

  /** Get a texture for a given name
   * @param {String} name
   * @return {PIXI.Texture} */
  get(name) {
    if ( !this.textures.has(name) ) {
      console.warn(`There is no such asset with name: ${name}`);
      return;
    }
    return this.textures.get(name);
  }

  /** Name of a component this pack belongs to
   * @return {String} */
  get name() {
    return this._name;
  }

  /** To get all textures
   * @return {Object} */
  get textures() {
    return this._textures;
  }
}