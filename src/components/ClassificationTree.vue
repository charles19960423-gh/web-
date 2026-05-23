<script setup lang="ts">
import type { FileInfo } from '../types/file'

defineProps<{
  categoryName: string
  files: FileInfo[]
  icon: string
}>()

const emit = defineEmits<{
  download: [files: FileInfo[]]
}>()
</script>

<template>
  <div class="category-folder" @click="emit('download', files)">
    <span class="category-icon">{{ icon }}</span>
    <span class="category-name">{{ categoryName }}</span>
    <span class="file-count">({{ files.length }})</span>
  </div>
</template>
