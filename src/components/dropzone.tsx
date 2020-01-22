import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { Colors, FontWeights, FontSizes } from '../lib/style-guide'
import { randomClassName } from '../lib/rcn'

import { PropsInterface } from '../lib/interfaces'

import picture from '../icons/screen.png'

const rcn = randomClassName()

const Dropzone: FC<PropsInterface> = (props: PropsInterface) => {
  const { sendFile, className, link, isShowBtn } = props
  const inputEl = useRef(null)
  const [isDrop, setDrop] = useState(false)

  const checkSize = (file: File) => {
    let w = 0
    let h = 0
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const img = new Image()
      img.addEventListener('load', () => {
        ;(w = img.width), (h = img.height)
        if (w > 100 || h > 100) {
          alert('Logo should be square, 100px size')
        } else {
          sendFile(file)
        }
      })
      if (typeof reader.result === 'string') {
        img.src = reader.result
      }
    })
    reader.readAsDataURL(file)
  }

  const dropHandler = (event: React.DragEvent) => {
    setDrop(false)
    event.preventDefault()
    const transfer = event.nativeEvent.dataTransfer

    if (transfer && transfer.items) {
      for (let i = 0; i < transfer.items.length; i++) {
        if (transfer.items[i].kind === 'file') {
          const file = transfer.items[i].getAsFile()
          file && checkSize(file)
        }
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      checkSize(event.target.files[0])
    }
  }

  return (
    <div
      className={className}
      style={
        isDrop
          ? {
              background: Colors.BG3,
              border: '1px dashed #4991E5'
            }
          : {}
      }
      draggable={true}
      ref={inputEl}
      onDragEnter={() => setDrop(true)}
      onDragLeave={(event) => {
        if (
          (event.target instanceof HTMLElement &&
            !event.currentTarget.contains(event.target)) ||
          event.target === event.currentTarget
        ) {
          setDrop(false)
        }
      }}
      onDrop={(event) => dropHandler(event)}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className={rcn('wrapper')}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {link && <image href={link} x="0" y="-5" width="80" height="90" />}
          {!link && (
            <image href={picture} x="22" y="17" width="35" height="50" />
          )}
          <circle
            cx="40"
            cy="40"
            r="39.5"
            fill="transparent"
            stroke="#D1E3F8"
          />
        </svg>
        <div className={rcn('container')}>
          <span className={rcn('drag-text')}>
            Drag & drop here {link ? 'to replace' : ''}
          </span>
          <span className={rcn('drag-or')}>- or -</span>

          <div className={rcn('upload-btn-wrapper')}>
            {isShowBtn ? (
              <button className={rcn('btn')}>Cancel</button>
            ) : (
              <button className={rcn('btn')}>Select file to upload</button>
            )}
            <input
              className={rcn('input')}
              name="file"
              type="file"
              ref={inputEl}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledDropzone = styled(Dropzone)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    display: block;
    margin-top: 8px;
    border-radius: 50%;
  }
  .${rcn('input')} {
    opacity: 0;
    position: relative;
    top: -18px;
    width: 100%;
    height: 15px;
  }
  .${rcn('wrapper')} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 46px;
    height: 143px;
  }
  .${rcn('drag-text')} {
    font-weight: ${FontWeights.PR};
    ${FontSizes.medium};
    color: ${Colors.TX2};
    line-height: 14px;
    margin-bottom: 6px;
  }
  .${rcn('drag-or')} {
    ${FontSizes.small};
    color: ${Colors.TX3};
    line-height: 12px;
  }
  .${rcn('upload-btn-wrapper')} {
    overflow: hidden;
    width: 105px;
    height: 18px;
  }
  .${rcn('btn')} {
    font-weight: ${FontWeights.PR};
    ${FontSizes.medium};
    text-align: center;
    color: #4991e5;
    border: 0;
    background-color: transparent;
    height: 15px;
    width: 100%;
  }
  .${rcn('container')} {
    width: 155px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export default StyledDropzone
