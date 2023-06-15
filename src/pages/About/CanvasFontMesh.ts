/*
 * @Author: hongbin
 * @Date: 2023-06-14 10:46:55
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-15 11:41:55
 * @Description:  canvas 绘制立体文字
 */

import THREE from 'three';
import { ThreeHelper } from './ThreeHelper';

class Canvas {
  canvas: HTMLCanvasElement = document.createElement('canvas');
  protected ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
  public texture = new THREE.Texture(this.canvas);

  constructor(font: string) {
    const accuracy = 1;
    this.canvas.width = 220 * accuracy;
    this.canvas.height = 240 * accuracy;

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.shadowBlur = 5 * accuracy;
    this.ctx.shadowColor = '#ffffff';

    //绘制文字
    this.ctx.font = `${200 * accuracy}px Georgia`;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(font, 110 * accuracy, 190 * accuracy);

    this.texture.needsUpdate = true;
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.canvas.style.position = 'fixed';
    this.canvas.style.zIndex = '12';
    this.canvas.style['border'] = '1px solid';
  }
}

export class CanvasFontMesh extends Canvas {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;

  constructor(font: string, position = new THREE.Vector3()) {
    super(font);

    const material = new THREE.MeshStandardMaterial({
      map: this.texture,
      // alphaMap: this.texture,
      // transparent: true,
      displacementMap: this.texture,
      displacementScale: 0.5,
      side: THREE.DoubleSide,
    });

    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
                  #include <dithering_fragment>
                  if(gl_FragColor.r < 0.3){
                     discard;
                  }
              `
      );
    };

    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 50, 50), material);

    this.mesh.position.copy(position);
    // ThreeHelper.instance.add(this.mesh);
  }
}
