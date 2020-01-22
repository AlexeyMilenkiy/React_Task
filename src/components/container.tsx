import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { initGoogleStorage, insertObject } from '../lib/google-config'

import StyledHeader from './header'
import StyledDropzone from './dropzone'

import { Colors } from '../lib/style-guide'
import { randomClassName } from '../lib/rcn'

const rcn = randomClassName()

const Container: FC = ({ className }) => {
  const [imgLink, setImgLink] = useState('')
  const [isShowBtn, setShowBtn] = useState(false)

  useEffect(() => {
    initGoogleStorage()
  }, [])

  const sendFile = (file: File) => {
    setShowBtn(true)
    insertObject(file, setLink)
  }

  const setLink = (link: string) => {
    setShowBtn(false)
    setImgLink(link)
  }

  return (
    <div className={className}>
      <StyledHeader />
      <div className={rcn('dropzone-container')}>
        <StyledDropzone
          sendFile={sendFile}
          link={imgLink}
          isShowBtn={isShowBtn}
        />
      </div>
    </div>
  )
}

const StyledContainer = styled(Container)`
  width: 400px;
  height: 590px;
  background: ${Colors.PureWhite};
  border: 1px solid #e8f1fb;

  .${rcn('dropzone-container')} {
    width: 100%;
    height: calc(100% - 79px);
    padding: 20px;
  }
`

export default StyledContainer
