import * as THREE from 'three';

// Extend THREE.Renderer?

export class Renderer {
  public renderer = new THREE.WebGLRenderer();

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;

    this.setSize();

    window.addEventListener('resize', this.resize);
  }

  private setSize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.setSize();
  };

  public render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  public animate = () => {
    this.renderer.setAnimationLoop(this.render);
  };

  public dispose() {
    this.renderer.dispose();
    window.removeEventListener('resize', this.resize);
  }
}
