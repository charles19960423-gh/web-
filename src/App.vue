<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FileInfo } from './types/file'
import { useFileStore } from './stores/fileStore'
import { downloadCategory, downloadAll, downloadAllByDate, downloadAllByDateAndType, downloadDateWithTypes } from './utils/zipUtils'
import { groupFilesByDate, groupFilesByDateAndType } from './utils/timeUtils'
import { ElMessage } from 'element-plus'
import UploadArea from './components/UploadArea.vue'
import FileList from './components/FileList.vue'
import ClassificationTree from './components/ClassificationTree.vue'
import DateGroup from './components/DateGroup.vue'
import DateTypeGroup from './components/DateTypeGroup.vue'
import ActionButtons from './components/ActionButtons.vue'

const store = useFileStore()
const activeTab = ref<'category' | 'date' | 'dateType'>('category')

const filesGroupedByDate = computed(() => {
  return groupFilesByDate(store.files)
})

const filesGroupedByDateAndType = computed(() => {
  return groupFilesByDateAndType(store.files)
})

function handleFilesSelected(files: File[]) {
  store.addFiles(files)
}

function handleRemoveFile(id: string) {
  store.removeFile(id)
}

async function handleDownloadCategory(files: FileInfo[]) {
  if (files.length === 0) {
    ElMessage.warning('该分类没有文件')
    return
  }
  const categoryName = files[0].category
  await downloadCategory(files, categoryName)
}

async function handleDownloadDateGroup(files: FileInfo[], date: string) {
  if (files.length === 0) {
    ElMessage.warning('该日期没有文件')
    return
  }
  await downloadCategory(files, date)
}

async function handleDownloadDateWithTypes(date: string) {
  const dateFiles = filesGroupedByDateAndType.value[date]
  if (!dateFiles || Object.keys(dateFiles).length === 0) {
    ElMessage.warning('该日期没有文件')
    return
  }
  await downloadDateWithTypes(store.files, date)
}

async function handleDownloadDateType(date: string, type: string, files: FileInfo[]) {
  if (files.length === 0) {
    ElMessage.warning('该分类没有文件')
    return
  }
  const fileName = `${date}_${type}`
  await downloadCategory(files, fileName)
}

async function handleDownloadAll() {
  if (store.files.length === 0) {
    ElMessage.warning('没有可下载的文件')
    return
  }
  if (activeTab.value === 'date') {
    await downloadAllByDate(store.files)
  } else if (activeTab.value === 'dateType') {
    await downloadAllByDateAndType(store.files)
  } else {
    await downloadAll(store.classificationResult)
  }
}

function handleReset() {
  store.clearAll()
  ElMessage.success('已重置')
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>文件自动归类工具</h1>
      <el-button type="danger" plain @click="handleReset">重置</el-button>
    </header>

    <UploadArea @files-selected="handleFilesSelected" />

    <FileList
      v-if="store.files.length > 0"
      :files="store.files"
      @remove-file="handleRemoveFile"
    />

    <div v-if="store.files.length > 0">
      <el-tabs v-model="activeTab" type="card" style="margin-bottom: 16px;">
        <el-tab-pane label="按类型整理" name="category">
          <div class="classification-section">
            <h3 style="margin-bottom: 16px">分类结果</h3>
            <ClassificationTree
              category-name="视频"
              :files="store.classificationResult.video"
              icon="🎬"
              @download="handleDownloadCategory"
            />
            <ClassificationTree
              category-name="音频"
              :files="store.classificationResult.audio"
              icon="🎵"
              @download="handleDownloadCategory"
            />
            <ClassificationTree
              category-name="图片"
              :files="store.classificationResult.image"
              icon="🖼️"
              @download="handleDownloadCategory"
            />
            <ClassificationTree
              category-name="文档"
              :files="store.classificationResult.document"
              icon="📄"
              @download="handleDownloadCategory"
            />
            <ClassificationTree
              v-if="store.classificationResult.unknown.length > 0"
              category-name="未知"
              :files="store.classificationResult.unknown"
              icon="❓"
              @download="handleDownloadCategory"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="按时间整理" name="date">
          <div class="classification-section">
            <h3 style="margin-bottom: 16px">按日期整理</h3>
            <DateGroup
              v-for="(files, date) in filesGroupedByDate"
              :key="date"
              :date="date"
              :files="files"
              @download="(files) => handleDownloadDateGroup(files, date)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="按时间+类型整理" name="dateType">
          <div class="classification-section">
            <h3 style="margin-bottom: 16px">按日期+类型整理</h3>
            <DateTypeGroup
              v-for="(types, date) in filesGroupedByDateAndType"
              :key="date"
              :date="date"
              :types="types"
              @download-date="handleDownloadDateWithTypes"
              @download-type="handleDownloadDateType"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <ActionButtons
      v-if="store.files.length > 0"
      :has-files="store.files.length > 0"
      @download-all="handleDownloadAll"
      @reset="handleReset"
    />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
}

.app-header h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
</style>
