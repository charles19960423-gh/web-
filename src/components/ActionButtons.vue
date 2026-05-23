<script setup lang="ts">
defineProps<{
  hasFiles: boolean
}>()

const emit = defineEmits<{
  downloadSelected: []
  downloadAll: []
  reset: []
}>()
</script>

<template>
  <div class="action-buttons">
    <el-button
      type="primary"
      :disabled="!hasFiles"
      @click="emit('downloadAll')"
    >
      下载全部
    </el-button>
    <el-button
      type="warning"
      :disabled="!hasFiles"
      @click="emit('reset')"
    >
      重置
    </el-button>
  </div>
</template>
