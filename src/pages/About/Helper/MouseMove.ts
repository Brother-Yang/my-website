/*
 * @Author: hongbin
 * @Date: 2023-06-15 12:00:21
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-16 20:38:44
 * @Description: 鼠标移动 镜头晃动
 */

import { Vector3 } from 'three';
import { ThreeHelper } from '../ThreeHelper';

export class MouseMove {
  point = new Vector3();

  constructor() {
    this.init();
  }

  mousemove(e: MouseEvent) {
    //@ts-ignore
    this.point.add({ x: e.movementX, y: e.movementY, z: 0 });
    this.point.normalize().divideScalar(100);
    // ThreeHelper.instance.controls.target.set(0, 0, 0);
    ThreeHelper.instance.camera.position.add(this.point);
  }

  selfMouseMove = (e: MouseEvent) => this.mousemove.call(this, e);

  init() {
    document.addEventListener('mousemove', this.selfMouseMove);
  }

  dispose() {
    document.removeEventListener('mousemove', this.selfMouseMove);
  }
}
