/*
 * @Author: hongbin
 * @Date: 2023-06-14 22:52:29
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-20 20:21:15
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
  textArr = [
    { str: ['H', 'E', 'L', 'L', '😄'], params: { space: 1.5 } },
    { str: ['滚', '动', '浏', '览'], params: { size: [0.15, 0.15, 0.1], space: 0.3 } },
  ];
  setOpacity: (opacity: number) => void;
  attr = { opacity: 1 };
  opacityQuickTo = gsap.quickTo(this.attr, 'opacity', {
    duration: 0.4,
    ease: 'power2',
    onUpdate: () => {
      this.setOpacity(this.attr.opacity);
      this.group.position.z = (1 - this.attr.opacity) * -5;
    },
  });
  opacityQuickToIns: gsap.core.Tween;

  constructor() {
    this.init();
  }

  init() {
    this.group.add(this.textGroupWrap);
    ThreeHelper.instance.add(this.group);

    this.initTexts();
    this.initLineBg();
  }

  initLineBg() {
    ThreeHelper.instance.loadGltf('/models/line_bg.glb').then((gltf) => {
      const line_bg = gltf.scene.getObjectByName('line_bg');
      if (!line_bg) return;

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
            this.textGroupWrap.position.z = -5 * event.progress;
          },
          onLeave: (e) => {
            console.log('leave');
            this.opacityQuickToIns = this.opacityQuickTo(0).play();
          },
          onEnterBack: () => {
            console.log('onEnterBack');
            this.opacityQuickToIns = this.opacityQuickTo(1).play();
          },
        },
      });
    });
  }

  geoParagraph({ str, params }: (typeof this.textArr)[number]) {
    const textGroup = new Group();
    const length = str.length / 2 - 1;
    str.forEach((str, strIndex) => {
      const text = new CanvasFontMesh(str);
      text.mesh.material.transparent = true;
      text.mesh.position.x = strIndex * params.space;
      if (params.size) text.mesh.geometry.scale(params.size[0], params.size[1], params.size[2]);
      textGroup.add(text.mesh);
    });
    textGroup.position.x = -length * params.space;
    return textGroup;
  }

  initTexts() {
    const title = this.geoParagraph(this.textArr[0]);
    const desc = this.geoParagraph(this.textArr[1]);
    desc.rotation.x = -0.15;
    desc.position.set(0, -1, 4);

    this.textGroupWrap.add(title, desc);

    this.setOpacity = (opacity: number) => {
      this.group.traverse((obj) => {
        if (obj.type == 'Mesh') {
          const mesh = obj as StandardMesh;
          mesh.material.opacity = opacity;
        }
      });
    };

    this.setOpacity(0);

    // title.position.y = 10;
    // gsap.to(title.position, {
    //   y: 0,
    //   duration: 1,
    //   ease: 'power2',
    // });

    // desc.position.y = -10;
    // desc.position.z = 10;

    // gsap.to(desc.position, {
    //   y: -1,
    //   z: 4,
    //   duration: 1,
    //   ease: 'power2',
    //   onComplete: function () {
    //     gsap.to(desc.rotation, {
    //       x: -3.17 * 2,
    //       duration: 0.5,
    //       ease: 'power2',
    //     });
    //   },
    // });
  }
}
