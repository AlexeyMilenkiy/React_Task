declare global {
  interface Window {
    gapi: any
  }
}

export interface PropsInterface {
  sendFile: (file: File) => void
  className?: string
  link: string
  isShowBtn: boolean
}

export interface GoogleResponse {
  kind: string
  id: string
  selfLink: string
  name: string
  bucket: string
  generation: string
  metageneration: string
  contentType: string
  timeCreated: string
  updated: string
  storageClass: string
  timeStorageClassUpdated: string
  size: string
  md5Hash: string
  mediaLink: string
  crc32c: string
  etag: string
}

export interface Cred {
  PROJECT_ID: string
  CLIENT_ID: string
  API_KEY: string
}
