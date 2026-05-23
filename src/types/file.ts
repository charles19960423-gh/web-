export const FileType = {
  VIDEO: 'video',
  AUDIO: 'audio',
  IMAGE: 'image',
  DOCUMENT: 'document',
  UNKNOWN: 'unknown'
} as const

export type FileTypeValue = typeof FileType[keyof typeof FileType]

export interface FileInfo {
  id: string
  file: File
  name: string
  size: number
  type: FileTypeValue
  category: string
  status: 'pending' | 'classified' | 'error'
  errorMsg?: string
}

export interface ClassificationResult {
  video: FileInfo[]
  audio: FileInfo[]
  image: FileInfo[]
  document: FileInfo[]
  unknown: FileInfo[]
}

export const CATEGORY_NAMES: Record<FileTypeValue, string> = {
  video: '视频',
  audio: '音频',
  image: '图片',
  document: '文档',
  unknown: '未知'
}

export const FILE_TYPE_MAP: Record<string, FileTypeValue> = {
  mp4: 'video',
  mov: 'video',
  avi: 'video',
  mkv: 'video',
  flv: 'video',
  wmv: 'video',
  mp3: 'audio',
  wav: 'audio',
  flac: 'audio',
  m4a: 'audio',
  ogg: 'audio',
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  webp: 'image',
  bmp: 'image',
  txt: 'document',
  pdf: 'document',
  doc: 'document',
  docx: 'document',
  xls: 'document',
  xlsx: 'document',
  ppt: 'document',
  pptx: 'document'
}

export const SUPPORTED_EXTENSIONS = Object.keys(FILE_TYPE_MAP)
