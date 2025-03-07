/*
 * Tencent is pleased to support the open source community by making TMagicEditor available.
 *
 * Copyright (C) 2023 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FormConfig, FormState } from '@tmagic/form';

/**
 * 统一为组件属性表单加上事件、高级、样式配置
 * @param config 组件属性配置
 * @returns Object
 */
export const fillConfig = (config: FormConfig = []) => [
  {
    type: 'tab',
    items: [
      {
        title: '属性',
        labelWidth: '80px',
        items: [
          // 组件类型，必须要有
          {
            text: 'type',
            name: 'type',
            type: 'hidden',
          },
          // 组件id，必须要有
          {
            name: 'id',
            type: 'display',
            text: 'id',
          },
          {
            name: 'name',
            text: '组件名称',
          },
          ...config,
        ],
      },
      {
        title: '样式',
        labelWidth: '80px',
        items: [
          {
            name: 'style',
            items: [
              {
                type: 'fieldset',
                legend: '位置',
                items: [
                  {
                    name: 'position',
                    type: 'checkbox',
                    activeValue: 'fixed',
                    inactiveValue: 'absolute',
                    defaultValue: 'absolute',
                    text: '固定定位',
                  },
                  {
                    name: 'left',
                    text: 'left',
                  },
                  {
                    name: 'top',
                    text: 'top',
                    disabled: (vm: FormState, { model }: any) =>
                      model.position === 'fixed' && model._magic_position === 'fixedBottom',
                  },
                  {
                    name: 'right',
                    text: 'right',
                  },
                  {
                    name: 'bottom',
                    text: 'bottom',
                    disabled: (vm: FormState, { model }: any) =>
                      model.position === 'fixed' && model._magic_position === 'fixedTop',
                  },
                ],
              },
              {
                type: 'fieldset',
                legend: '盒子',
                items: [
                  {
                    name: 'width',
                    text: '宽度',
                  },
                  {
                    name: 'height',
                    text: '高度',
                  },
                ],
              },
              {
                type: 'fieldset',
                legend: '背景',
                items: [
                  {
                    name: 'backgroundImage',
                    text: '背景图',
                  },
                  {
                    name: 'backgroundColor',
                    text: '背景颜色',
                    type: 'colorPicker',
                  },
                  {
                    name: 'backgroundRepeat',
                    text: '背景图重复',
                    type: 'select',
                    defaultValue: 'no-repeat',
                    options: [
                      { text: 'repeat', value: 'repeat' },
                      { text: 'repeat-x', value: 'repeat-x' },
                      { text: 'repeat-y', value: 'repeat-y' },
                      { text: 'no-repeat', value: 'no-repeat' },
                      { text: 'inherit', value: 'inherit' },
                    ],
                  },
                  {
                    name: 'backgroundSize',
                    text: '背景图大小',
                    defaultValue: '100% 100%',
                  },
                ],
              },
              {
                type: 'fieldset',
                legend: '字体',
                items: [
                  {
                    name: 'color',
                    text: '颜色',
                    type: 'colorPicker',
                  },
                  {
                    name: 'fontSize',
                    text: '大小',
                  },
                  {
                    name: 'fontWeight',
                    text: '粗细',
                  },
                ],
              },
              {
                type: 'fieldset',
                legend: '变形',
                name: 'transform',
                items: [
                  {
                    name: 'rotate',
                    text: '旋转角度',
                  },
                  {
                    name: 'scale',
                    text: '缩放',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: '事件',
        items: [
          {
            name: 'events',
            type: 'event-select',
            labelWidth: 0,
          },
        ],
      },
      {
        title: '高级',
        lazy: true,
        items: [
          {
            name: 'created',
            text: 'created',
            labelWidth: '100px',
            type: 'code-select',
          },
          {
            name: 'mounted',
            text: 'mounted',
            labelWidth: '100px',
            type: 'code-select',
          },
        ],
      },
    ],
  },
];
