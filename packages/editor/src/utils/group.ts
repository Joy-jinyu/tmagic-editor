import { MNode } from '@tmagic/schema';

import { AddMNode } from '../type';

export const nodeStyle = (nodeStyle: any = {}) => ({
  top: Number(nodeStyle.top) || 0,
  left: Number(nodeStyle.left) || 0,
  width: Number(nodeStyle.width) || 0,
  height: Number(nodeStyle.height) || 0,
});

// 编组
export const getMakeGroupRoot = (nodes: MNode[] = []): AddMNode | undefined => {
  if (nodes.length < 1) return;

  const containerStyle = nodes.reduce(
    (record, node) => {
      const { top, left, right, bottom } = record;
      const { top: nodeTop, left: nodeLeft, width: nodeWidth, height: nodeHeight } = nodeStyle(node.style);

      const nodeRight = nodeLeft + nodeWidth;
      const nodeBottom = nodeTop + nodeHeight;

      return {
        top: top === 0 ? nodeTop : Math.min(top, nodeTop),
        left: left === 0 ? nodeLeft : Math.min(left, nodeLeft),
        right: Math.max(nodeRight, right),
        bottom: Math.max(nodeBottom, bottom),
      };
    },
    {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  );

  const { top, left, right, bottom } = containerStyle;

  return {
    name: nodes[0].name ? `【编组】${nodes[0].name}` : '【编组】unknown',
    type: 'container',
    style: {
      top,
      left,
      width: right - left,
      height: bottom - top,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    items: nodes.map((node) => {
      const { style } = node;
      const { top: nodeTop, left: nodeLeft } = style || {};

      return {
        ...node,
        style: {
          ...style,
          top: Number(nodeTop) - top,
          left: Number(nodeLeft) - left,
        },
      };
    }),
  };
};

// 取消编组
export const getRedoMakeNodes = (root: MNode) => {
  if (!root) return;
  const childrenList = root.items;

  const { top: rootTop, left: rootLeft } = nodeStyle(root.style);

  return childrenList.map((children: any) => {
    const { top: childrenTop, left: childrenLeft } = nodeStyle(children.style);

    return {
      ...children,
      style: {
        ...children.style,
        top: rootTop + childrenTop,
        left: rootLeft + childrenLeft,
      },
    };
  });
};
