/*
 * @Author: hongbin
 * @Date: 2023-06-14 22:52:29
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-15 11:56:55
 * @Description: 欢迎文本
 */

import { Group, Vector3 } from 'three';
import { CanvasFontMesh } from '../CanvasFontMesh';
import { gsap } from 'gsap';
import { ThreeHelper } from '../ThreeHelper';

export class WelcomeScreen {
  textArr = [['👏'], ['W', 'e', 'l', 'c', 'o', 'm', 'e'], ['🎉']];

  constructor() {
    this.init();
  }

  init() {
    this.textArr.forEach((arr, arrIndex) => {
      const length = arr.length / 2 - 1;
      const group = new Group();
      arr.forEach((str, strIndex) => {
        const text = new CanvasFontMesh(str);
        group.add(text.mesh);
        text.mesh.position.x = strIndex * 1.5 * (0.5 - Math.random()) * 20;
        text.mesh.position.y = arrIndex * 2 * (0.5 - Math.random()) * 20;
        text.mesh.position.z = Math.random() * 180;
        gsap.to(text.mesh.position, {
          x: strIndex * 1.5,
          y: arrIndex * 2,
          z: 0,
          duration: 1 + (0.5 - Math.random()),
          delay: strIndex * 0.1,
          ease: 'power2.in',
        });
      });
      group.position.x = -length * 1.5;
      ThreeHelper.instance.add(group);
    });
  }
}
