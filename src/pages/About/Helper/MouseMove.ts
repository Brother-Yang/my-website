/*
 * @Author: hongbin
 * @Date: 2023-06-15 12:00:21
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-18 20:12:59
 * @Description: 鼠标移动 镜头晃动
 */

import { Vector3 } from 'three';
import { ThreeHelper } from '../ThreeHelper';
import { gsap } from 'gsap';

export class MouseMove {
  point = new Vector3();
  prevCameraPosition = new Vector3();

  constructor() {
    this.init();
  }

  mousemove(e: MouseEvent) {
    //@ts-ignore
    this.point.add({ x: e.movementX, y: e.movementY, z: 0 });
    this.point.normalize().divideScalar(100);
    ThreeHelper.instance.camera.position.add(this.point);
  }

  mousedown(e: MouseEvent) {
    this.prevCameraPosition.copy(ThreeHelper.instance.camera.position);
    document.addEventListener('mouseup', this.selfMouseUp, { once: true });
  }

  mouseup(e: MouseEvent) {
    const { x, y, z } = this.prevCameraPosition;
    gsap.to(ThreeHelper.instance.camera.position, {
      x,
      y,
      z,
      duration: 0.8,
    });
  }

  selfMouseMove = (e: MouseEvent) => this.mousemove.call(this, e);
  selfMouseDown = (e: MouseEvent) => this.mousedown.call(this, e);
  selfMouseUp = (e: MouseEvent) => this.mouseup.call(this, e);

  init() {
    document.addEventListener('mousemove', this.selfMouseMove);
    document.addEventListener('mousedown', this.selfMouseDown);
  }

  dispose() {
    document.removeEventListener('mousemove', this.selfMouseMove);
  }
}
