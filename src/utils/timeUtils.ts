import type { FileInfo } from '../types/file'

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function sortFilesByTime(files: FileInfo[]): FileInfo[] {
  return [...files].sort((a, b) => b.file.lastModified - a.file.lastModified)
}

export function groupFilesByDate(files: FileInfo[]): Record<string, FileInfo[]> {
  const grouped: Record<string, FileInfo[]> = {}
  
  for (const fileInfo of files) {
    const lastModified = new Date(fileInfo.file.lastModified)
    const dateKey = formatDate(lastModified)
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(fileInfo)
  }
  
  const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const result: Record<string, FileInfo[]> = {}
  for (const key of sortedKeys) {
    result[key] = sortFilesByTime(grouped[key])
  }
  
  return result
}

export interface DateTypeGroup {
  [date: string]: {
    [type: string]: FileInfo[]
  }
}

const typeOrder = ['视频', '音频', '图片', '文档', '未知']

export function groupFilesByDateAndType(files: FileInfo[]): DateTypeGroup {
  const grouped: DateTypeGroup = {}
  
  for (const fileInfo of files) {
    const lastModified = new Date(fileInfo.file.lastModified)
    const dateKey = formatDate(lastModified)
    const typeKey = fileInfo.category
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = {}
    }
    if (!grouped[dateKey][typeKey]) {
      grouped[dateKey][typeKey] = []
    }
    grouped[dateKey][typeKey].push(fileInfo)
  }
  
  const sortedDateKeys = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const result: DateTypeGroup = {}
  
  for (const dateKey of sortedDateKeys) {
    result[dateKey] = {}
    const types = Object.keys(grouped[dateKey])
    types.sort((a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b))
    for (const typeKey of types) {
      result[dateKey][typeKey] = sortFilesByTime(grouped[dateKey][typeKey])
    }
  }
  
  return result
}
