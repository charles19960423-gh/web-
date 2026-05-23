<script setup lang="ts">
import type { FileInfo } from '../types/file'
import { formatFileSize } from '../utils/classifier'

defineProps<{
  files: FileInfo[]
}>()

const emit = defineEmits<{
  removeFile: [id: string]
}>()
</script>

<template>
  <div class="file-list">
    <h3 style="margin-bottom: 16px">上传文件列表 ({{ files.length }})</h3>
    <el-table :data="files" style="width: 100%" empty-text="暂无文件">
      <el-table-column prop="name" label="文件名" min-width="200" />
      <el-table-column prop="size" label="大小" width="120">
        <template #default="{ row }">
          {{ formatFileSize(row.size) }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="100">
        <template #default="{ row }">
          <el-tag :type="row.type === 'unknown' ? 'info' : 'primary'" size="small">
            {{ row.category }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template #default="{ row }">
          <el-button type="danger" size="small" text @click="emit('removeFile', row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
