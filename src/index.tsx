import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import StyledContainer from './components/container'

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    <StyledContainer />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
