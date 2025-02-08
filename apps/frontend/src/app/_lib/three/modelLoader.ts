import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ModelLoader {
  loader = new GLTFLoader().setPath('assets/models/');

  async load(path: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (model) => {
          resolve(model);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }
}
