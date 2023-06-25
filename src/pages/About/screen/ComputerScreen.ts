/*
 * @Author: hongbin
 * @Date: 2023-06-16 20:46:18
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-24 21:59:12
 * @Description:第二屏幕 "电脑"
 */

import { Box3Helper, Group } from 'three';
import { ThreeHelper } from '../ThreeHelper';
import { gsap } from 'gsap';
import { MyEnvironment } from './MyEnv';
import { getBoxSize, getWindowSize } from '../ThreeHelper/utils';

export class ComputerScreen {
  group = new Group();
  onEnter = () => {};

  constructor() {
    this.loadModel();
    ThreeHelper.instance.add(this.group);
  }

  /**
   * 将模型设置到窗口上方
   */
  setModelOnWindowAbove(model: Object3D) {
    const windowHeight = getWindowSize(ThreeHelper.instance.camera).height / 2;
    const boxSize = getBoxSize(model);
    // 除却y轴 如果z轴很宽 那么后面也会漏出来 所以加上z轴长度
    const modelHeight = boxSize.y / 2 + boxSize.z / 2;
    return modelHeight + windowHeight;
  }

  loadModel() {
    ThreeHelper.instance.loadGltf('/models/computer.glb').then((gltf) => {
      console.log(gltf);
      this.group.add(gltf.scene);
      this.enterAnimation();

      const y = this.setModelOnWindowAbove(gltf.scene);
      this.group.position.y = y;
      this.group.userData.startPositionY = y;

      const env = MyEnvironment();
      const envMap = ThreeHelper.instance.pmremGenerator.fromScene(env, 0.01).texture;

      gltf.scene.traverse((obj: StandardMesh) => {
        if (obj.isMesh) {
          obj.material.envMap = envMap;
        }
      });

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
    this.group.position.z = 6;
    const loadContainer = this.group.getObjectByName('loadContainer') as Object3D;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 0.9,
        end: innerHeight * 2,
        onUpdate: (event) => {
          const p = 1 - event.progress;
          this.group.position.y = p * this.group.userData.startPositionY;
        },
        onLeave: (e) => {},
        onEnterBack: () => {
          this.onEnter();
        },
        onEnter: () => {
          this.onEnter();
        },
      },
    });

    const screen = this.group.getObjectByName('屏幕') as StandardMesh;
    screen.material.color.setScalar(0);
    screen.material.roughness = 0;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 2,
        end: innerHeight * 2.5,
        onUpdate: (event) => {
          const p = event.progress;
          // this.group.position.z = 6 * p;
          // screen.material.color.setScalar(event.progress * 0.1);
          screen.material.metalness = event.progress;
          // screen.material.roughness = 1 - event.progress;
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

    const apple_logo = loadContainer.getObjectByName('apple_logo') as StandardMesh;

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 3.5,
        end: innerHeight * 4.5,
        onUpdate: (event) => {
          this.group.rotation.y = event.progress * -0.7;

          this.group.position.y = event.progress * -1;
          this.group.position.z = event.progress * -2 + 6;
          this.group.position.x = event.progress * -4;
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
