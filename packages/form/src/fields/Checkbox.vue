<template>
  <TMagicCheckbox
    v-model="model[name]"
    :size="size"
    :trueLabel="activeValue"
    :falseLabel="inactiveValue"
    :disabled="disabled"
    @change="changeHandler"
    >{{ config.text }}</TMagicCheckbox
  >
</template>

<script setup lang="ts" name="MFormCheckbox">
import { computed } from 'vue';

import { TMagicCheckbox } from '@tmagic/design';

import { CheckboxConfig } from '../schema';
import { useAddField } from '../utils/useAddField';

const props = defineProps<{
  config: CheckboxConfig;
  model: any;
  initValues?: any;
  values?: any;
  name: string;
  prop: string;
  disabled?: boolean;
  size?: 'large' | 'default' | 'small';
  lastValues?: Record<string, any>;
}>();

const emit = defineEmits(['change']);

useAddField(props.prop);

const activeValue = computed(() => {
  if (typeof props.config.activeValue === 'undefined') {
    if (props.config.filter === 'number') {
      return 1;
    }
  } else {
    return props.config.activeValue;
  }

  return undefined;
});

const inactiveValue = computed(() => {
  if (typeof props.config.inactiveValue === 'undefined') {
    if (props.config.filter === 'number') {
      return 0;
    }
  } else {
    return props.config.inactiveValue;
  }

  return undefined;
});

const changeHandler = (value: number | boolean) => {
  emit('change', value);
};
</script>
