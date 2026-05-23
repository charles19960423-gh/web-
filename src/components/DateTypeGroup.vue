<script setup lang="ts">
import type { FileInfo } from '../types/file'
import { formatFileSize } from '../utils/classifier'

defineProps<{
  date: string
  types: Record<string, FileInfo[]>
}>()

const emit = defineEmits<{
  downloadDate: [date: string, files: FileInfo[]]
  downloadType: [date: string, type: string, files: FileInfo[]]
}>()

const typeIcons: Record<string, string> = {
  '视频': '🎬',
  '音频': '🎵',
  '图片': '🖼️',
  '文档': '📄',
  '未知': '❓'
}

function getAllFiles(types: Record<string, FileInfo[]>): FileInfo[] {
  return Object.values(types).flat()
}
</script>

<template>
  <div class="date-type-group">
    <div class="date-header" @click="emit('downloadDate', date, getAllFiles(types))">
      <span class="date-icon">📅</span>
      <span class="date-text">{{ date }}</span>
      <span class="file-count">({{ getAllFiles(types).length }}个文件)</span>
    </div>
    
    <div class="types-container">
      <div v-for="(files, type) in types" :key="type" class="type-group">
        <div class="type-header" @click="emit('downloadType', date, type, files)">
          <span class="type-icon">{{ typeIcons[type] || '📁' }}</span>
          <span class="type-text">{{ type }}</span>
          <span class="type-count">({{ files.length }})</span>
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
    </div>
  </div>
</template>

<style scoped>
.date-type-group {
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
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
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

.types-container {
  margin-top: 12px;
}

.type-group {
  margin-bottom: 12px;
}

.type-group:last-child {
  margin-bottom: 0;
}

.type-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #606266;
  padding: 6px 12px;
  background: #fff;
  border-radius: 4px;
}

.type-icon {
  margin-right: 6px;
}

.type-text {
  flex: 1;
}

.type-count {
  color: #909399;
  font-weight: normal;
}
</style>
