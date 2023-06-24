/*
 * @Author: hongbin
 * @Date: 2023-06-14 10:30:59
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-24 21:47:33
 * @Description: 关于洋少页 - 宏斌撰
 */
import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { ThreeHelper } from './ThreeHelper';
import * as THREE from 'three';
import { CanvasFontMesh } from './CanvasFontMesh';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { WelcomeScreen } from './screen/WelcomeScreen';
import { MouseMove } from './Helper/MouseMove';
import { ComputerScreen } from './screen/ComputerScreen';

interface IProps {}

const destroyEvent = [] as VoidFunction[];

const About: FC<IProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(
    () => {
      if (canvasRef.current) {
        const helper = new ThreeHelper({
          antialias: true,
          canvas: canvasRef.current,
        });

        init(helper);
        helper.listenResize();
        console.log('渲染');
        return () => {
          console.log('清除依赖');
          destroyEvent.forEach((f) => f());

          helper.clearScene();
          helper.stopFrame();
          helper.removeResizeListen();
        };
      }
    }
    //  TODO  依赖项 当前webpack配置 每次热重载不执行清除依赖副作用 故 不填写此项每次都执行整个useEffect函数内容
  );

  return (
    <Container id="container">
      <FixedCanvasWrap>
        <canvas ref={canvasRef}></canvas>
      </FixedCanvasWrap>
    </Container>
  );
};

export default About;

async function init(helper: ThreeHelper) {
  helper.camera.position.set(0, 0, 10);
  helper.frameByFrame();
  helper.controls.enableZoom = false;
  helper.controls.enablePan = false;
  // helper.useRoomEnvironment();
  // helper.addAxis();

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const spotLight = new THREE.SpotLight(new THREE.Color('#ffffff'), 2, 2, 0.3, 1, 0);
  helper.camera.add(spotLight);
  helper.add(helper.camera);

  // const noiseBg = new NoiseBg(helper.camera);
  // helper.add(noiseBg.plane);

  const mouseMove = new MouseMove();

  const welcomeScreen = new WelcomeScreen();

  welcomeScreen.onEnter = () => {
    mouseMove.amplitude = 1;
    console.log(1);
  };
  welcomeScreen.onLeave = (p) => {
    spotLight.position.z = (1 - p) * -10;
  };

  if (window.scrollX < 10) {
    const spotLightGsap = gsap.to(spotLight, {
      duration: 0.5,
      angle: 0.5,
      delay: 0.5,
      onUpdate: () => {
        welcomeScreen.setOpacity(spotLight.angle - 0.3);
      },
      onComplete: () => {
        spotLightGsap.reverse();
      },
      ease: 'power4',
    });
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: '#container',
      start: 0,
      end: innerHeight / 2,
      onUpdate: (event) => {
        spotLight.angle = 0.3 + event.progress;
        welcomeScreen.setOpacity(event.progress);
        if (welcomeScreen.opacityQuickToIns) welcomeScreen.opacityQuickToIns.pause();
      },
      onLeave: (e) => {},
      onEnterBack: () => {},
    },
  });

  const computerScreen = new ComputerScreen();

  computerScreen.onEnter = () => {
    mouseMove.amplitude = 10;
  };

  destroyEvent.push(() => {
    mouseMove.dispose();
    helper.controls.dispose();
  });
}

const Container = styled.div`
  width: 100%;
  height: 1000vh;
`;

const FixedCanvasWrap = styled.div`
  position: fixed !important;
  width: 100%;
  height: 100vh;
  z-index: 1;
  top: 0;
  left: 0;
`;

class NoiseBg {
  plane: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;

  constructor(camera: THREE.PerspectiveCamera) {
    const vFOV = (camera.fov * Math.PI) / 180;

    const height = 2 * Math.tan(vFOV / 2) * camera.position.z;

    const width = height * camera.aspect;

    const material = this.noiseMaterial();

    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 1, 1), material);
    this.plane.onAfterRender = () => {
      this.plane.material.uniforms.iTime.value += 0.01;
    };
  }

  noiseMaterial() {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 1 },
      },
      transparent: true,
      vertexShader: `
          varying vec2 vUv;
          
          void main() {
              vUv = uv;
              vec4 viewPosition =modelViewMatrix * vec4(position, 1.0);
              gl_Position =  projectionMatrix * viewPosition;
              // gl_Position =  vec4(position, 1.0);
          }`,
      fragmentShader: `
          varying vec2 vUv;
          uniform float iTime;

          #define PI 3.141592653589793

          highp float rand( const in vec2 uv ) {

              const highp float a = 12.9898, b = 78.233, c = 43758.5453;
              highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
          
              return fract( sin( sn ) * c );
          
          }
                  
          void main() {
              vec3 color = vec3(rand(vUv * iTime));
              gl_FragColor = vec4(color, 0.2);
          }`,
    });
    return material;
  }
}
