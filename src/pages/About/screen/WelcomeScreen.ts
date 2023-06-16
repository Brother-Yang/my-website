/*
 * @Author: hongbin
 * @Date: 2023-06-14 22:52:29
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-16 20:35:33
 * @Description: 欢迎文本
 */

import { Group, Vector3 } from 'three';
import { CanvasFontMesh } from '../CanvasFontMesh';
import { gsap } from 'gsap';
import { ThreeHelper } from '../ThreeHelper';
import { modelSurround } from '../Helper/ModelSurround';

export class WelcomeScreen {
  group = new Group();
  textGroupWrap = new Group();
  textRandom: { mesh: Mesh; prev: { x: number; y: number; z: number; opacity: number } }[][] = [
    [],
    [],
    [],
  ];

  textArr = [
    ['W', 'e', 'l', 'c', 'o', 'm', 'e'],
    ['👏', '🎉'],
    ['滚', '动', '浏', '览'],
  ];

  constructor() {
    this.init();
  }

  init() {
    this.initTexts();
    this.initLineBg();
  }

  initLineBg() {
    ThreeHelper.instance.loadGltf('/models/line_bg.glb').then((gltf) => {
      const line_bg = gltf.scene.getObjectByName('line_bg');

      if (line_bg) {
        const lineGroupWrap = new Group();

        const lineGroup = modelSurround({ model: line_bg, radius: 10, count: 25 });
        lineGroup.position.z = -150;
        lineGroupWrap.add(lineGroup);
        {
          const lineGroup = modelSurround({ model: line_bg, radius: 15, count: 25 });
          lineGroupWrap.add(lineGroup);
          lineGroup.position.z = -180;
        }
        this.group.add(lineGroupWrap);
        lineGroupWrap.position.y -= 1;
        lineGroupWrap.position.z = -300;

        const params = {
          rotateY: lineGroupWrap.rotation.y,
          posZ: lineGroupWrap.position.z,
        };

        gsap.to(params, {
          rotateY: 0,
          posZ: 100,
          duration: 1,
          onUpdate: () => {
            lineGroupWrap.position.z = params.posZ;
          },
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: '#container',
            start: 0,
            end: innerHeight,
            onUpdate: (event) => {
              lineGroupWrap.position.z = 100 + event.progress * 80;
            },
            onLeave: (e) => {
              console.log('leave');
              this.textLeave();
            },
            onEnterBack: () => {
              console.log('onEnterBack');
              this.textLeave(false);
            },
          },
        });
      }
    });
  }

  initTexts() {
    this.textArr.forEach((arr, arrIndex) => {
      const length = arr.length / 2 - 1;
      const textGroup = new Group();
      this.textGroupWrap.add(textGroup);
      arr.forEach((str, strIndex) => {
        const text = new CanvasFontMesh(str);
        text.mesh.material.transparent = true;
        textGroup.add(text.mesh);
        text.mesh.position.x = strIndex * 1.5 * (0.5 - Math.random()) * 20;
        text.mesh.position.y = arrIndex * 2 * (0.5 - Math.random()) * 20;
        text.mesh.position.z = Math.random() * 180;

        const to = { x: strIndex * 1.7, y: arrIndex * -2, z: -10 };

        gsap.to(text.mesh.position, {
          ...to,
          duration: 1 + (0.5 - Math.random()),
          delay: strIndex * 0.1,
          ease: 'power2.in',
        });

        this.textRenderIndex(text.mesh, to, arrIndex);
      });
      textGroup.position.x = -length * 1.5;
      this.group.add(this.textGroupWrap);
      ThreeHelper.instance.add(this.group);
    });
  }

  textRenderIndex(mesh: Mesh, vec: { x: number; y: number; z: number }, arrIndex: number) {
    // const index = Math.floor(Math.random() * 3);
    // this.textRandom[index].push({ mesh, prev: { ...vec, opacity: 1 } });

    this.textRandom[arrIndex].push({ mesh, prev: { ...vec, opacity: 1 } });
  }

  textLeave(leave = true) {
    if (leave) {
      this.textRandom.forEach((texts) => {
        texts.forEach(({ mesh, prev }) => {
          const prevVec = { ...prev };

          const dir = 0.5 - Math.random() > 0 ? 1 : -1;

          gsap.to(prevVec, {
            z: (0.7 + Math.random()) * 13 * dir,
            opacity: 0,
            duration: 0.5,
            onUpdate: () => {
              mesh.position.z = prevVec.z;
              // @ts-ignore
              mesh.material.opacity = prevVec.opacity;
            },
            onComplete: () => {
              this.textGroupWrap.visible = false;
            },
          });
        });
      });
    } else {
      this.textRandom.forEach((texts) => {
        texts.forEach(({ mesh, prev }) => {
          const prevVec = { ...mesh.position, opacity: 0 };
          gsap.to(prevVec, {
            ...prev,
            opacity: 1,
            duration: 0.5,
            onUpdate: () => {
              mesh.position.set(prevVec.x, prevVec.y, prevVec.z);
              // @ts-ignore
              mesh.material.opacity = prevVec.opacity;
            },
            onStart: () => {
              this.textGroupWrap.visible = true;
            },
          });
        });
      });
    }
  }
}
