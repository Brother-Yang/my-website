/*
 * @Author: hongbin
 * @Date: 2023-06-15 16:00:26
 * @LastEditors: hongbin
 * @LastEditTime: 2023-06-15 17:03:13
 * @Description:
 */

import { Group } from 'three';

/**
 * 根据一个模型生成一个围绕一圈的组合
 */
export const modelSurround = ({
  model,
  radius,
  count,
  radian = 360,
  column = 1,
}: {
  /**
   * 模型
   */
  model: Object3D;
  /**
   * 半径
   */
  radius: number;
  /**
   * 重复数量
   */
  count: number;
  /**
   * 排列弧度默认360度(一周)
   * @default 360
   */
  radian?: number;
  /**
   * 绕y轴旋转几列360列即为球形 默认1列
   * @default 1
   */
  column?: number;
}) => {
  const group = new Group();
  const onceAngle = (Math.PI * 2) / 360; //一度
  const spaceAngle = (radian / count) * onceAngle; //两个物体中间的夹角度数

  for (let l = 0; l < column; l++) {
    const columnGroup = new Group();
    for (let i = 0; i < count; i++) {
      const item = model.clone();
      const x = Math.sin(spaceAngle * i + Math.random()) * radius * (0.8 + Math.random() * 0.2);
      const y = Math.cos(spaceAngle * i + Math.random()) * radius * (0.8 + Math.random() * 0.2);
      item.position.set(x, y, Math.random() * radius);
      item.scale.x = Math.random() * 2;
      item.scale.y = Math.random() * 2;
      columnGroup.add(item);
    }
    columnGroup.rotation.y = (180 / column) * onceAngle * l;
    group.add(columnGroup);
  }

  return group;
};
