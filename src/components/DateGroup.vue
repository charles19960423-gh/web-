<script setup lang="ts">
import type { FileInfo } from '../types/file'
import { formatFileSize } from '../utils/classifier'

defineProps<{
  date: string
  files: FileInfo[]
}>()

const emit = defineEmits<{
  download: [files: FileInfo[]]
}>()
</script>

<template>
  <div class="date-group">
    <div class="date-header" @click="emit('download', files)">
      <span class="date-icon">📅</span>
      <span class="date-text">{{ date }}</span>
      <span class="file-count">({{ files.length }})</span>
    </div>
    <el-table :data="files" style="width: 100%; margin-top: 8px;" size="small">
      <el-table-column prop="name" label="文件名" min-width="200" />
      <el-table-column prop="size" label="大小" width="100">
        <template #default="{ row }">
          {{ formatFileSize(row.size) }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="类型" width="80">
        <template #default="{ row }">
          <el-tag type="info" size="small">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.date-group {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 6px;
}

.date-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #303133;
}

.date-icon {
  margin-right: 8px;
}

.date-text {
  flex: 1;
}

.file-count {
  color: #909399;
  font-weight: normal;
}
</style>
