import { FILE_TYPE_MAP, CATEGORY_NAMES } from '../types/file'
import type { FileInfo, FileTypeValue } from '../types/file'

export function classifyFile(file: File): FileTypeValue {
  const ext = file.name.split('.').pop()?.toLowerCase() || ''
  return FILE_TYPE_MAP[ext] || 'unknown'
}

export function classifyFileToInfo(file: File): FileInfo {
  const type = classifyFile(file)
  return {
    id: crypto.randomUUID(),
    file,
    name: file.name,
    size: file.size,
    type,
    category: CATEGORY_NAMES[type],
    status: 'classified'
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
