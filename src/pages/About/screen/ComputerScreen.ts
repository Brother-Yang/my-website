/*
 * @Author: hongbin
 * @Date: 2023-06-16 20:46:18
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-16 20:51:09
 * @Description:第二屏幕 "电脑"
 */

import { Group } from 'three';
import { ThreeHelper } from '../ThreeHelper';

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
    });
  }
}
