<template>
  <ContentMenu :menu-data="menuData" ref="menu" style="overflow: initial"></ContentMenu>
</template>

<script lang="ts" setup name="MEditorLayerMenu">
import { computed, inject, markRaw, ref } from 'vue';
import { CopyDocument, Delete, Files, Plus } from '@element-plus/icons-vue';

import { NodeType } from '@tmagic/schema';

import ContentMenu from '@editor/components/ContentMenu.vue';
import type { ComponentGroup, MenuButton, MenuComponent, Services } from '@editor/type';

const props = defineProps<{
  layerContentMenu: (MenuButton | MenuComponent)[];
}>();

const services = inject<Services>('services');
const menu = ref<InstanceType<typeof ContentMenu>>();
const node = computed(() => services?.editorService.get('node'));
const isRoot = computed(() => node.value?.type === NodeType.ROOT);
const isPage = computed(() => node.value?.type === NodeType.PAGE);
const componentList = computed(() => services?.componentListService.getList() || []);

const createMenuItems = (group: ComponentGroup): MenuButton[] =>
  group.items.map((component) => ({
    text: component.text,
    type: 'button',
    icon: component.icon,
    handler: () => {
      services?.editorService.add({
        name: component.text,
        type: component.type,
        ...(component.data || {}),
      });
    },
  }));

const getSubMenuData = computed<MenuButton[]>(() => {
  if (node.value?.type === 'tabs') {
    return [
      {
        text: '标签页',
        type: 'button',
        icon: Files,
        handler: () => {
          services?.editorService.add({
            type: 'tab-pane',
          });
        },
      },
    ];
  }
  if (node.value?.items) {
    return (
      componentList.value.reduce(
        (subMenuData: MenuButton[], group: ComponentGroup, index) =>
          subMenuData.concat(
            createMenuItems(group),
            index < componentList.value.length - 1
              ? [
                  {
                    type: 'divider',
                    direction: 'horizontal',
                  },
                ]
              : [],
          ),
        [],
      ) || []
    );
  }
  return [];
});

const menuData = computed<(MenuButton | MenuComponent)[]>(() => [
  {
    type: 'button',
    text: '新增',
    icon: markRaw(Plus),
    display: () => node.value?.items,
    items: getSubMenuData.value,
  },
  {
    type: 'button',
    text: '复制',
    icon: markRaw(CopyDocument),
    display: () => !isRoot.value,
    handler: () => {
      node.value && services?.editorService.copy(node.value);
    },
  },
  {
    type: 'button',
    text: '删除',
    icon: markRaw(Delete),
    display: () => !isRoot.value && !isPage.value,
    handler: () => {
      node.value && services?.editorService.remove(node.value);
    },
  },
  ...props.layerContentMenu,
]);

const show = (e: MouseEvent) => {
  menu.value?.show(e);
};

defineExpose({
  show,
});
</script>
