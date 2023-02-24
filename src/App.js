import React from 'react'
import './assets/css/App.css'
import './assets/css/Main.css'
import MainLayout from './components/MainLayout'
import Templates from './components/Stories/Templates'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import ModalView from './components/modal'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          {/* <Redirect exact from='/' to='/stories/templates' /> */}
          {/* <Route component={MainLayout} path='/stories/editor' /> */}
          <Route component={MainLayout} path='/story/:storyId' />
          <Route component={Templates} path='/' />
        </Switch>
      </Router>
      <ModalView />
    </div>
  )
}
export default App
