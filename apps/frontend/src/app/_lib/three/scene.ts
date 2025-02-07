import * as THREE from 'three';

import { RefObject } from 'react';
import { Renderer } from './renderer';

type TargetRef = RefObject<HTMLDivElement | null>;

export class Scene {
  ref: TargetRef;

  renderer: Renderer | null = null;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  );

  constructor(ref: TargetRef) {
    this.ref = ref;

    if (!ref) return;

    this.renderer = new Renderer(this.scene, this.camera);
    ref.current?.appendChild(this.renderer.renderer.domElement);
    this.renderer.animate();
  }

  public dispose() {
    if (!this.renderer || !this.ref) return;

    this.ref.current?.removeChild(this.renderer.renderer.domElement);

    this.renderer.dispose();
  }
}
