/*
 * @Author: hongbin
 * @Date: 2023-06-14 10:30:59
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-14 11:31:59
 * @Description: 关于洋少页 - 宏斌撰
 */
import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { ThreeHelper } from './ThreeHelper';
import * as THREE from 'three';
import { CanvasFontMesh } from './CanvasFontMesh';

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
    <Container>
      <Canvas ref={canvasRef}></Canvas>
    </Container>
  );
};

export default About;

async function init(helper: ThreeHelper) {
  helper.camera.position.set(0, 0, 10);
  helper.frameByFrame();
  helper.useRoomEnvironment(true);
  // helper.useSkyEnvironment();
  helper.initLights();

  new CanvasFontMesh('🌈', new THREE.Vector3(-2, 0, 0));
  new CanvasFontMesh('👏');
  new CanvasFontMesh('🎉', new THREE.Vector3(2, 0, 0));
  new CanvasFontMesh('李', new THREE.Vector3(-2, -2, 0));
  new CanvasFontMesh('苏', new THREE.Vector3(0, -2, 0));
  new CanvasFontMesh('洋', new THREE.Vector3(2, -2, 0));
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Canvas = styled.canvas``;
