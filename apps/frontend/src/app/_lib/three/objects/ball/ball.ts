import * as THREE from 'three';

import { ModelLoader } from '../../modelLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Ball {
  model: GLTF['scene'] | null = null;

  public async load() {
    const loader = new ModelLoader();
    const { scene: modelScene } = await loader.load('cube.glb');

    this.model = modelScene;

    this.model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
      }
    });

    this.model.position.set(2, 1, 0);

    return this;
  }
}
