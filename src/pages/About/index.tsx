/*
 * @Author: hongbin
 * @Date: 2023-06-14 10:30:59
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-14 18:23:22
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

interface IProps {}

const destroyEvent = [] as VoidFunction[];

const About: FC<IProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const helper = new ThreeHelper({
        antialias: true,
        canvas: canvasRef.current,
      });
      init(helper);
      helper.listenResize();

      return () => {
        destroyEvent.forEach((f) => f());
        helper.clearScene();
        helper.stopFrame();
        helper.removeResizeListen();
      };
    }
  }, [init]);

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
  helper.useRoomEnvironment(true);
  helper.controls.enabled = false;
  // helper.useSkyEnvironment();
  helper.initLights();

  new CanvasFontMesh('🌈', new THREE.Vector3(-2, 0, 0));
  new CanvasFontMesh('👏');
  new CanvasFontMesh('🎉', new THREE.Vector3(2, 0, 0));
  new CanvasFontMesh('李', new THREE.Vector3(-2, -2, 0));
  new CanvasFontMesh('苏', new THREE.Vector3(0, -2, 0));
  new CanvasFontMesh('洋', new THREE.Vector3(2, -2, 0));

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#container',
      start: 0,
      end: document.getElementById('container').offsetHeight - innerHeight,
      //   onUpdate: (event) => {
      //     console.log(event, event.progress);
      //   },
    },
  });

  const p = { x: 0 };

  timeline.to(
    p,
    {
      x: 3,
      duration: 1,
      onUpdate: () => {
        console.log(p);
      },
    },
    3
  );
  timeline.to(
    p,
    {
      x: 0,
      duration: 1,
      onUpdate: () => {
        console.log(1, p);
      },
    },
    2
  );
}

const Container = styled.div`
  width: 100vw;
  height: 500vh;
`;

const FixedCanvasWrap = styled.div`
  position: fixed !important;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 0;
  left: 0;
`;
