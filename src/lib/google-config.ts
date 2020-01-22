import { GoogleResponse } from './interfaces'
import credentials from '../../credentials'

const gapi = window.gapi
const PROJECT_ID = credentials.PROJECT_ID
const CLIENT_ID = credentials.CLIENT_ID
const API_KEY = credentials.API_KEY
const SCOPE = ['https://www.googleapis.com/auth/devstorage.full_control']
const BUCKET_NAME = 'new-bucket-for-app'

export const initGoogleStorage = async () => {
  await gapi.load('client', () => {
    gapi.client.setApiKey(API_KEY)

    gapi.auth.authorize(
      {
        client_id: CLIENT_ID,
        scope: SCOPE,
        immediate: false
      },
      function(authResult: any) {
        if (authResult && !authResult.error) {
          initializeApi()
        } else {
          window.alert('Auth was not successful')
        }
      }
    )

    async function initializeApi() {
      await gapi.load('client:auth2', function() {
        gapi.auth2.init({ client_id: CLIENT_ID })
      })
      await gapi.client.load('storage', 'v1')
      const data = await getBucketList()
      const bucket =
        data.result.items &&
        data.result.items.find((bucket: any) => bucket.id === BUCKET_NAME)
      if (!bucket) {
        insertBucket()
      }
    }

    async function insertBucket() {
      const resource = {
        name: BUCKET_NAME
      }

      await window.gapi.client.storage.buckets.insert({
        project: PROJECT_ID,
        resource: resource,
        predefinedAcl: 'publicRead',
        predefinedDefaultObjectAcl: 'publicRead'
      })
    }

    async function getBucketList() {
      const buckets = await window.gapi.client.storage.buckets.list({
        project: PROJECT_ID
      })
      return buckets
    }
  })
}

export async function insertObject(
  fileData: File,
  callback: (url: string) => void
) {
  const boundary = '-------314159265358979323846'
  const delimiter = '\r\n--' + boundary + '\r\n'
  const closeDelim = '\r\n--' + boundary + '--'

  const reader = new FileReader()
  reader.readAsBinaryString(fileData)
  reader.onload = function() {
    const contentType = fileData.type || 'application/octet-stream'
    const metadata = {
      name: fileData.name,
      mimeType: contentType
    }
    const result: string | ArrayBuffer | null = reader.result
    if (typeof result === 'string') {
      const base64Data = btoa(result)
      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' +
        contentType +
        '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        closeDelim

      gapi.client.request({
        path: `/upload/storage/v1/b/${BUCKET_NAME}/o`,
        method: 'POST',
        params: { uploadType: 'multipart' },
        headers: {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        body: multipartRequestBody,
        callback: function(response: GoogleResponse) {
          callback(response.mediaLink)
        }
      })
    }
  }
}
