/*
 * @Author: hongbin
 * @Date: 2023-06-16 20:46:18
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-18 18:41:20
 * @Description:第二屏幕 "电脑"
 */

import { Group } from 'three';
import { ThreeHelper } from '../ThreeHelper';
import { gsap } from 'gsap';

export class ComputerScreen {
  group = new Group();

  constructor() {
    this.loadModel();
    ThreeHelper.instance.add(this.group);
  }

  loadModel() {
    ThreeHelper.instance.loadGltf('/models/computer.glb').then((gltf) => {
      console.log(gltf);
      this.group.add(gltf.scene);
      this.enterAnimation();

      const 底座 = gltf.scene.getObjectByName('底座') as StandardMesh;
      const apple_logo = gltf.scene.getObjectByName('apple_logo') as StandardMesh;
      // @ts-ignore
      底座.material.thickness = 1;
      // @ts-ignore
      底座.material.iridescence = 2;
      // @ts-ignore
      底座.material.iridescenceIOR = 1.2;
      // @ts-ignore
      apple_logo.material.iridescence = 2;
      // @ts-ignore
      apple_logo.material.iridescenceIOR = 1.2;
    });
  }

  enterAnimation() {
    const prevRotateY = Math.PI / 2;
    this.group.rotation.y = prevRotateY;
    this.group.position.x = -15;
    this.group.position.y = -0.3;

    const loadContainer = this.group.getObjectByName('loadContainer') as Object3D;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight,
        end: innerHeight * 2,
        onUpdate: (event) => {
          const p = 1 - event.progress;
          this.group.position.x = -15 * p;
          this.group.rotation.y = prevRotateY * p;
        },
        onLeave: (e) => {
          console.log('leave');
        },
        onEnterBack: () => {
          console.log('onEnterBack');
        },
      },
    });

    const screen = this.group.getObjectByName('屏幕') as StandardMesh;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 2,
        end: innerHeight * 2.5,
        onUpdate: (event) => {
          const p = event.progress;
          this.group.position.z = 6 * p;
          screen.material.color.setScalar(event.progress * 0.1);
          loadContainer.position.z = p * 0.04;
        },
        onLeave: (e) => {
          console.log('leave');
        },
        onEnterBack: () => {
          console.log('onEnterBack');
        },
      },
    });

    const progressBar = loadContainer.getObjectByName('progressBar') as StandardMesh;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 2.5,
        end: innerHeight * 3.5,
        onUpdate: (event) => {
          progressBar.scale.x = event.progress;
        },
        onLeave: (e) => {
          console.log('leave');
        },
        onEnterBack: () => {
          console.log('onEnterBack');
        },
      },
    });
  }
}
