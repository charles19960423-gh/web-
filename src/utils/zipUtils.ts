import JSZip from 'jszip'
import type { FileInfo, ClassificationResult } from '../types/file'
import { downloadFile } from './fileUtils'
import { groupFilesByDate, groupFilesByDateAndType, sortFilesByTime } from './timeUtils'

export async function downloadCategory(
  files: FileInfo[],
  categoryName: string
): Promise<void> {
  if (files.length === 0) return

  if (files.length === 1) {
    downloadFile(files[0].file)
    return
  }

  const zip = new JSZip()
  const folder = zip.folder(categoryName)

  if (!folder) return

  const sortedFiles = sortFilesByTime(files)
  for (const fileInfo of sortedFiles) {
    folder.file(fileInfo.name, fileInfo.file)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${categoryName}.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadAll(
  classifiedFiles: ClassificationResult
): Promise<void> {
  const zip = new JSZip()
  const categoryFolders: { name: string; files: FileInfo[] }[] = [
    { name: '视频', files: classifiedFiles.video },
    { name: '音频', files: classifiedFiles.audio },
    { name: '图片', files: classifiedFiles.image },
    { name: '文档', files: classifiedFiles.document },
    { name: '未知', files: classifiedFiles.unknown }
  ]

  for (const { name, files } of categoryFolders) {
    if (files.length === 0) continue
    const folder = zip.folder(name)
    if (!folder) continue
    const sortedFiles = sortFilesByTime(files)
    for (const fileInfo of sortedFiles) {
      folder.file(fileInfo.name, fileInfo.file)
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '全部文件.zip'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadAllByDate(
  files: FileInfo[]
): Promise<void> {
  const zip = new JSZip()
  const groupedFiles = groupFilesByDate(files)

  for (const [date, dateFiles] of Object.entries(groupedFiles)) {
    const folder = zip.folder(date)
    if (!folder) continue
    for (const fileInfo of dateFiles) {
      folder.file(fileInfo.name, fileInfo.file)
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '全部文件(按日期).zip'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadAllByDateAndType(
  files: FileInfo[]
): Promise<void> {
  const zip = new JSZip()
  const groupedFiles = groupFilesByDateAndType(files)

  for (const [date, types] of Object.entries(groupedFiles)) {
    const dateFolder = zip.folder(date)
    if (!dateFolder) continue
    
    for (const [type, typeFiles] of Object.entries(types)) {
      const typeFolder = dateFolder.folder(type)
      if (!typeFolder) continue
      for (const fileInfo of typeFiles) {
        typeFolder.file(fileInfo.name, fileInfo.file)
      }
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '全部文件(按日期和类型).zip'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadDateWithTypes(
  files: FileInfo[],
  date: string
): Promise<void> {
  const zip = new JSZip()
  const groupedFiles = groupFilesByDateAndType(files)
  const dateFiles = groupedFiles[date]

  if (!dateFiles) return

  for (const [type, typeFiles] of Object.entries(dateFiles)) {
    const typeFolder = zip.folder(type)
    if (!typeFolder) continue
    for (const fileInfo of typeFiles) {
      typeFolder.file(fileInfo.name, fileInfo.file)
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${date}.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
