/*
 * @Author: hongbin
 * @Date: 2023-06-15 12:00:21
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-27 09:33:57
 * @Description: 鼠标移动 镜头晃动
 */

import { Vector2, Vector3 } from 'three';
import { ThreeHelper } from '../ThreeHelper';
import { gsap } from 'gsap';

export class MouseMove {
  point = new Vector3();
  prevCameraPosition = new Vector3();
  viewSize = new Vector3(innerWidth, innerHeight, 1);
  initCameraPosition = ThreeHelper.instance.camera.position.clone();
  pause = false;
  xQuickTo = gsap.quickTo(ThreeHelper.instance.camera.position, 'x', {
    duration: 0.5,
  });
  yQuickTo = gsap.quickTo(ThreeHelper.instance.camera.position, 'y', {
    duration: 0.5,
  });
  xQuickToTween: gsap.core.Tween;
  yQuickToTween: gsap.core.Tween;
  /** 振幅 鼠标晃动的影响 */
  amplitude = 1;

  constructor() {
    this.init();
    // ThreeHelper.instance.controls.maxAzimuthAngle =
    // ThreeHelper.instance.controls.maxPolarAngle
  }

  mousemove(e: MouseEvent) {
    if (this.pause) return;

    //  -1 ~ 1
    const x = ((e.clientX / innerWidth) * 2 - 1) / this.amplitude;
    const y = ((e.clientY / innerHeight) * 2 - 1) / this.amplitude;

    this.xQuickToTween = this.xQuickTo(this.initCameraPosition.x + x).play();
    this.yQuickToTween = this.yQuickTo(this.initCameraPosition.y + y).play();
  }

  mousedown(e: MouseEvent) {
    if (this.pause) return;
    this.pause = true;
    this.prevCameraPosition.copy(ThreeHelper.instance.camera.position);
    if (this.xQuickToTween && this.yQuickToTween) {
      this.xQuickToTween.pause();
      this.yQuickToTween.pause();
    }
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
    ThreeHelper.instance.renderer.domElement.addEventListener('mousemove', this.selfMouseMove);
    ThreeHelper.instance.renderer.domElement.addEventListener('mousedown', this.selfMouseDown);
  }

  dispose() {
    ThreeHelper.instance.renderer.domElement.removeEventListener('mousemove', this.selfMouseMove);
    ThreeHelper.instance.renderer.domElement.removeEventListener('mousedown', this.selfMouseDown);
  }
}
