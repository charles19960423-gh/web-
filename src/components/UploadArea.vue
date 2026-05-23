<script setup lang="ts">
import { ref } from 'vue'
import { SUPPORTED_EXTENSIONS } from '../types/file'

const emit = defineEmits<{
  filesSelected: [files: File[]]
}>()

const isDragover = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  isDragover.value = true
}

function handleDragLeave() {
  isDragover.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragover.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  filterAndEmit(files)
}

function handleClick() {
  fileInput.value?.click()
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  filterAndEmit(files)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function filterAndEmit(files: File[]) {
  const validFiles = files.filter(file => {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    return SUPPORTED_EXTENSIONS.includes(ext)
  })
  if (validFiles.length > 0) {
    emit('filesSelected', validFiles)
  }
}
</script>

<template>
  <div
    class="upload-area"
    :class="{ dragover: isDragover }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="handleClick"
  >
    <div class="upload-icon">📁</div>
    <div class="upload-text">拖拽文件到此处或点击上传</div>
    <input
      ref="fileInput"
      type="file"
      multiple
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>
