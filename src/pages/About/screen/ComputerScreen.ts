/*
 * @Author: hongbin
 * @Date: 2023-06-16 20:46:18
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-27 23:25:43
 * @Description:第二屏幕 "电脑"
 */

import {
  AnimationMixer,
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  TextureLoader,
} from 'three';
import { ThreeHelper } from '../ThreeHelper';
import { gsap } from 'gsap';
import { getBoxSize, getWindowSize } from '../ThreeHelper/utils';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { CanvasFontMesh } from '../CanvasFontMesh';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { gt } from 'lodash';
import { ClickMesh } from './ClickMesh';

export class ComputerScreen {
  group = new Group();
  onEnter = () => {};
  boxSize: any;
  envMap: THREE.Texture;
  animation = (p: number) => {};
  peopleModel = new Group();
  clickMesh = new ClickMesh();
  link: Record<string, string> = {
    csdn: 'https://blog.csdn.net/printf_hello',
    gitee: 'https://gitee.com/honbingitee',
    github: 'https://github.com/Jedi-hongbin',
    bilibili: 'https://space.bilibili.com/374230437',
  };

  constructor() {
    const env = new RoomEnvironment();
    this.envMap = ThreeHelper.instance.pmremGenerator.fromScene(env, 0.01).texture;
    this.group.add(this.peopleModel);

    this.loadModel();

    ThreeHelper.instance.add(this.group);
    this.clickMesh.click((mesh) => {
      if (mesh) {
        const link = this.link[mesh.userData.name];
        if (link) {
          window.open(link, '_blank');
        }
      }
    });
  }

  setEnv(group: Object3D) {
    group.traverse((obj: StandardMesh) => {
      if (obj.isMesh) {
        obj.material.envMap = this.envMap;
      }
    });
  }

  /**
   * 将模型设置到窗口上方
   */
  setModelOnWindowAbove(model: Object3D) {
    const windowSize = getWindowSize(ThreeHelper.instance.camera);
    const windowHeight = windowSize.height / 2;
    const boxSize = getBoxSize(model);
    this.boxSize = boxSize;
    // 除却y轴 如果z轴很宽 那么后面也会漏出来 所以加上z轴长度
    const modelHeight = boxSize.y / 2 + boxSize.z / 2;
    return modelHeight + windowHeight;
  }

  loadModel() {
    ThreeHelper.instance.loadGltf('/models/computer.glb').then((gltf) => {
      console.log(gltf);
      this.group.add(gltf.scene);

      const innerScreen = this.group.getObjectByName('inner屏幕') as StandardMesh;
      innerScreen.material = new MeshStandardMaterial({
        map: new TextureLoader().load('/textures/pc_bg.jpg', (t) => {
          t.flipY = false;
          t.colorSpace = SRGBColorSpace;
        }),
      });

      this.loadPeopleModel();

      new FontLoader().load('/font/introduction.json', (font) => {
        this.enterAnimation(font);
        this.introduction(font);
      });

      const y = this.setModelOnWindowAbove(gltf.scene);
      this.group.position.y = y;
      this.group.userData.startPositionY = y;

      this.setEnv(gltf.scene);

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

  enterAnimation(font: Font) {
    this.group.position.z = 6;
    /**
     * 电脑出现
     */
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

    const loadContainer = this.group.getObjectByName('loadContainer') as Object3D;

    /**
     * logo出现
     */
    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 2,
        end: innerHeight * 2.5,
        onUpdate: (event) => {
          const p = event.progress;
          loadContainer.position.z = p * 0.04;
        },
        onLeave: (e) => {},
        onEnterBack: () => {},
      },
    });
    /**
     * 进度条推进
     */
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

    /**
     * 屏幕亮起 logo退却 人物探身
     */
    const screen = this.group.getObjectByName('屏幕') as StandardMesh;

    screen.material.transparent = true;
    screen.material.color.setScalar(0);

    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 3.5,
        end: innerHeight * 4.0,
        onUpdate: (event) => {
          loadContainer.position.z = 0.04 - event.progress / 15;
          screen.material.color.setScalar(event.progress);
          this.peopleModel.position.z = -0.4 + 0.2 * event.progress;
        },
        onLeave: (e) => {},
        onEnterBack: () => {},
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 4,
        end: innerHeight * 5,
        onUpdate: (event) => {
          this.peopleModel.position.z = -0.2 + 0.2 * event.progress;
          this.animation(event.progress);
          screen.material.opacity = 1 - event.progress;
        },
        onLeave: (e) => {},
        onEnterBack: () => {},
      },
    });

    /**
     * 结束致谢平面
     */
    const { width, height } = getWindowSize(ThreeHelper.instance.camera);

    const plane = new Mesh(
      new PlaneGeometry(width / 2, height),
      new MeshStandardMaterial({ color: '#fff', envMap: this.envMap })
    );

    plane.position.x = width + 1;

    ThreeHelper.instance.add(plane);

    const geometry = new TextGeometry('Thank', {
      font,
      size: 0.9,
      height: 0.5,
    });

    const mesh = new Mesh(
      geometry,
      new MeshStandardMaterial({
        color: '#000',
        envMap: this.envMap,
      })
    );

    mesh.position.x -= width / 5;
    plane.add(mesh);
    {
      const geometry = new TextGeometry('You', {
        font,
        size: 0.9,
        height: 0.5,
      });

      const mesh = new Mesh(
        geometry,
        new MeshStandardMaterial({
          color: '#000',
          envMap: this.envMap,
        })
      );
      mesh.position.y -= 1.2;
      mesh.position.x -= width / 5;
      plane.add(mesh);
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#container',
          scrub: 0.4,
          start: innerHeight * 6,
          end: innerHeight * 7,
          onUpdate: (event) => {
            this.group.rotation.y = event.progress * -0.7;

            this.group.position.y = event.progress * -1;
            this.group.position.z = event.progress * -2 + 6;
            this.group.position.x = event.progress * -(width / 2.2 - this.boxSize.x);
          },
        },
      })
      .to(plane.position, {
        x: width / 4,
        duration: 0.5,
      });
  }

  /**
   * 简介
   */
  introduction(font: Font) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: innerHeight * 5,
        end: innerHeight * 6,
        scrub: 1,
        onUpdate: (event) => {},
        onLeave: (e) => {
          console.log('自述结束');
        },
        onEnterBack: () => {},
      },
    });

    const textGroup = new Group();
    textGroup.position.set(-0.45, 1.1, -0.6);

    const desc = [
      'Hi!',
      '我是宏斌',
      '多年编程经验，热爱编程',
      '从事前端，跨平台APP开发，全栈开发',
      '目前专注Web3D开发',
    ];
    const meshPositions: Mesh[] = [];

    desc.forEach((str, column) => {
      str.split('').forEach((text, index) => {
        const geometry = new TextGeometry(text, {
          font,
          size: 0.09,
          height: 0.05,
        });

        const mesh = new Mesh(
          geometry,
          new MeshStandardMaterial({
            color: '#fff',
            envMap: this.envMap,
            transparent: true,
          })
        );
        mesh.position.x = index * 0.12;
        mesh.position.y = column * -0.17;
        mesh.position.z = 0;
        meshPositions.push(mesh);
        textGroup.add(mesh);
      });
    });

    /**
     * 不需要设置什么属性 设置时间即可获取进度
     */
    tl.to(meshPositions, {
      duration: 0.4,
      stagger: {
        each: 0.1,
        onUpdate: function () {
          const mesh = this.targets()[0];
          mesh.material.opacity = this.progress();
          mesh.position.z = this.progress() * 0.08;
        },
      },
    });

    const buttonGroup = this.group.getObjectByName('按钮组') as Mesh;
    console.log(buttonGroup);
    this.clickMesh.intersectObjects = [buttonGroup];
    const hideZ = buttonGroup.position.z - 0.05;

    buttonGroup.position.z = hideZ;

    /**
     * 文字显示后 外链图标
     */
    tl.to(buttonGroup.position, {
      z: hideZ + 0.05,
      duration: 0.3,
    });

    this.group.add(textGroup);
  }

  loadPeopleModel() {
    /**
     * TODO 模型第一次出现在视图中时 材质会被GPU加载 会卡顿 需解决
     */
    ThreeHelper.instance.loadGltf('/models/people.glb').then((gltf) => {
      this.setEnv(gltf.scene);
      console.log(gltf);
      this.peopleModel.add(gltf.scene);
      this.peopleModel.position.z = -0.4;

      // gltf.scene.traverse((obj: StandardMesh) => {
      //   if (obj.isMesh) {
      //     obj.material = new MeshStandardMaterial();
      //   }
      // });

      const mixer = new AnimationMixer(gltf.scene);
      const wave = gltf.animations.find((action) => action.name == 'wave') as THREE.AnimationClip;
      mixer.clipAction(wave).play();

      this.animation = (p: number) => {
        const time = p * wave.duration;
        mixer.setTime(time);
      };
    });
  }
}
