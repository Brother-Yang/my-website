/*
 * @Author: hongbin
 * @Date: 2023-06-21 17:18:33
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-21 17:35:42
 * @Description:
 */
/**
 * https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/EnvironmentScene.ts
 */

import {
  BackSide,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  Scene,
} from 'three';

export function MyEnvironment() {
  const scene = new Scene();

  const geometry = new BoxGeometry();
  geometry.deleteAttribute('uv');

  const roomMaterial = new MeshStandardMaterial({ side: BackSide });
  const boxMaterial = new MeshStandardMaterial();

  const mainLight = new PointLight(0xffffff, 5.0, 28, 2);
  mainLight.position.set(0.418, 16.199, 0.3);
  scene.add(mainLight);

  const room = new Mesh(geometry, roomMaterial);
  room.position.set(-0.757, 13.219, 0.717);
  room.scale.set(31.713, 28.305, 28.591);
  scene.add(room);

  //    const box1 = new Mesh( geometry, boxMaterial );
  //    box1.position.set( - 10.906, 2.009, 1.846 );
  //    box1.rotation.set( 0, - 0.195, 0 );
  //    box1.scale.set( 2.328, 7.905, 4.651 );
  //    this.add( box1 );

  this.dispose = () => {
    const resources = new Set();

    scene.traverse((object: StandardMesh) => {
      if (object.isMesh) {
        resources.add(object.geometry);
        resources.add(object.material);
      }
    });

    for (const resource of resources) {
      // @ts-ignore
      resource.dispose();
    }
  };
  return scene;
}
