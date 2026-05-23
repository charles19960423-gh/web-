import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FileInfo, ClassificationResult } from '../types/file'
import { classifyFileToInfo } from '../utils/classifier'

export const useFileStore = defineStore('file', () => {
  const files = ref<FileInfo[]>([])
  const isClassifying = ref(false)

  const classificationResult = computed<ClassificationResult>(() => {
    const result: ClassificationResult = {
      video: [],
      audio: [],
      image: [],
      document: [],
      unknown: []
    }

    for (const fileInfo of files.value) {
      switch (fileInfo.type) {
        case 'video':
          result.video.push(fileInfo)
          break
        case 'audio':
          result.audio.push(fileInfo)
          break
        case 'image':
          result.image.push(fileInfo)
          break
        case 'document':
          result.document.push(fileInfo)
          break
        default:
          result.unknown.push(fileInfo)
      }
    }

    return result
  })

  const totalCount = computed(() => files.value.length)

  const categoryCount = computed(() => ({
    video: classificationResult.value.video.length,
    audio: classificationResult.value.audio.length,
    image: classificationResult.value.image.length,
    document: classificationResult.value.document.length,
    unknown: classificationResult.value.unknown.length
  }))

  function addFiles(newFiles: File[]) {
    isClassifying.value = true
    const fileInfos = newFiles.map(file => classifyFileToInfo(file))
    files.value = [...files.value, ...fileInfos]
    isClassifying.value = false
  }

  function removeFile(id: string) {
    files.value = files.value.filter(f => f.id !== id)
  }

  function clearAll() {
    files.value = []
  }

  return {
    files,
    isClassifying,
    classificationResult,
    totalCount,
    categoryCount,
    addFiles,
    removeFile,
    clearAll
  }
})
