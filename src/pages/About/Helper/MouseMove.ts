/*
 * @Author: hongbin
 * @Date: 2023-06-15 12:00:21
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-20 09:02:42
 * @Description: 鼠标移动 镜头晃动
 */

import { Vector2, Vector3 } from 'three';
import { ThreeHelper } from '../ThreeHelper';
import { gsap } from 'gsap';

export class MouseMove {
  point = new Vector3();
  prevCameraPosition = new Vector3();
  viewCenter = new Vector3(innerWidth / 2, innerHeight / 2, 1);
  initCameraPosition = ThreeHelper.instance.camera.position.clone();
  pause = false;
  xQuickTo = gsap.quickTo(ThreeHelper.instance.camera.position, 'x', {
    duration: 0.5,
  });
  yQuickTo = gsap.quickTo(ThreeHelper.instance.camera.position, 'y', {
    duration: 0.5,
  });

  constructor() {
    this.init();
  }

  mousemove(e: MouseEvent) {
    if (this.pause) return;
    //@ts-ignore
    this.point.subVectors({ x: e.pageX, y: e.pageY, z: 1 }, this.viewCenter);
    this.point.divide(this.viewCenter).divideScalar(10);
    this.point.add(this.initCameraPosition);
    // console.log(this.point);
    this.xQuickTo(this.point.x);
    this.yQuickTo(this.point.y);
  }

  mousedown(e: MouseEvent) {
    this.pause = true;
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
      onComplete: () => {
        this.pause = false;
      },
    });
  }

  selfMouseMove = (e: MouseEvent) => this.mousemove.call(this, e);
  selfMouseDown = (e: MouseEvent) => this.mousedown.call(this, e);
  selfMouseUp = (e: MouseEvent) => this.mouseup.call(this, e);

  init() {
    document.addEventListener('mousemove', this.selfMouseMove);
    ThreeHelper.instance.renderer.domElement.addEventListener('mousedown', this.selfMouseDown);
  }

  dispose() {
    document.removeEventListener('mousemove', this.selfMouseMove);
    ThreeHelper.instance.renderer.domElement.removeEventListener('mousedown', this.selfMouseDown);
  }
}
