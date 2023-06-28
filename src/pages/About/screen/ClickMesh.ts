/*
 * @Author: hongbin
 * @Date: 2023-06-27 21:11:47
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-27 22:15:12
 * @Description: 鼠标点击物体
 */
import { Raycaster, Vector2 } from 'three';
import { ThreeHelper } from '../ThreeHelper';

export class ClickMesh {
  private raycaster: Raycaster;
  private pointer = new Vector2();
  destroy: () => void;
  intersectObjects: Object3D[] = [];

  private _click = (m?: Mesh) => {
    console.log('显示信息');
  };

  constructor() {
    this.raycaster = new Raycaster();

    /**
     * 鼠标单击物体
     */
    const click = ({ clientX, clientY }: MouseEvent) => {
      this.intersect(clientX, clientY, (mesh) => {
        this._click(mesh);
      });
    };

    document.addEventListener('click', click);
    this.destroy = () => {
      document.removeEventListener('click', click);
    };
  }

  private intersect(x: number, y: number, call: (m?: Mesh) => void) {
    const { offsetWidth, offsetHeight } = ThreeHelper.instance.renderer.domElement;

    this.pointer.set((x / offsetWidth) * 2 - 1, -(y / offsetHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, ThreeHelper.instance.camera);

    const intersects = this.raycaster.intersectObjects(this.intersectObjects, true);

    call(intersects[0]?.object as unknown as Mesh);
  }

  click(_click: (m?: Mesh) => void) {
    this._click = _click;
  }
}
