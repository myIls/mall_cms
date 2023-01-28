<template>
  <div class="hu-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
              :rules="item.rules"
            >
              <!-- 普通 和 密码输入框 -->
              <template v-if="['input', 'password'].includes(item.type)">
                <el-input
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :="item.otherOptions"
                />
              </template>

              <!-- 下拉选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :="item.otherOptions"
                >
                  <el-option
                    v-for="option in item.options"
                    :label="option.text"
                    :value="option.value"
                    :key="option.value"
                  />
                </el-select>
              </template>

              <!-- 时间选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  :="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from 'vue'
import { IFormItem } from '../types'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 30px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xs: 24, // <768px
      sm: 24, // ≥768px
      md: 12, // ≥992px
      lg: 8, // ≥992px
      xl: 6 // ≥1200px
    })
  }
})
const emit = defineEmits(['update:modelValue'])

const formData = ref({ ...props.modelValue })

watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  {
    deep: true
  }
)
</script>

<style scoped>
.hu-form {
  padding-top: 10px;
}
</style>
