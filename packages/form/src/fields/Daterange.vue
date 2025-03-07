<template>
  <TMagicDatePicker
    v-model="value"
    type="datetimerange"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :size="size"
    :unlink-panels="true"
    :disabled="disabled"
    :default-time="config.defaultTime"
    @change="changeHandler"
  ></TMagicDatePicker>
</template>

<script lang="ts" setup name="MFormDateRange">
import { ref, watch } from 'vue';

import { TMagicDatePicker } from '@tmagic/design';
import { datetimeFormatter } from '@tmagic/utils';

import { DaterangeConfig } from '../schema';
import { useAddField } from '../utils/useAddField';

const props = defineProps<{
  config: DaterangeConfig;
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

// eslint-disable-next-line vue/no-setup-props-destructure
const { names } = props.config;
const value = ref<(Date | undefined)[] | null>([]);

if (props.model !== undefined) {
  if (names?.length) {
    watch(
      [() => props.model[names[0]], () => props.model[names[1]]],
      ([start, end], [preStart, preEnd]) => {
        if (!value.value) {
          value.value = [];
        }
        if (!start || !end) value.value = [];
        if (start !== preStart) value.value[0] = new Date(start);
        if (end !== preEnd) value.value[1] = new Date(end);
      },
      {
        immediate: true,
      },
    );
  } else if (props.name && props.model[props.name]) {
    watch(
      () => props.model[props.name],
      (start, preStart) => {
        if (start !== preStart) value.value = start.map((item: string) => (item ? new Date(item) : undefined));
      },
      {
        immediate: true,
      },
    );
  }
}

const setValue = (v: Date[] | Date) => {
  names?.forEach((item, index) => {
    if (!props.model) {
      return;
    }
    if (Array.isArray(v)) {
      props.model[item] = datetimeFormatter(v[index]?.toString(), '');
    } else {
      props.model[item] = undefined;
    }
  });
};

const changeHandler = (v: Date[]) => {
  const value = v || [];

  if (props.name) {
    emit(
      'change',
      value.map((item?: Date) => {
        if (item) return datetimeFormatter(item, '');
        return undefined;
      }),
    );
  } else {
    if (names?.length) {
      setValue(value);
    }
    emit('change', value);
  }
};
</script>
