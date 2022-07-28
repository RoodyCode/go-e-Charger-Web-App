import { useState } from 'react'
import Nav from './components/Nav'
import Content from './components/Content'
import './App.css'

function App() {
  const [tab, setTab] = useState('charge')
  const updateTab = tabName => setTab(tabName)
  return (
    <div className="App">
      <Nav tab={tab} setTab={updateTab}></Nav>
      <Content tab={tab}></Content>
    </div>
  )
}

export default App
