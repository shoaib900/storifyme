import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import { ModalProvider } from './providers/Modal'
import { NotificationProvider } from './providers/Notification'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store/store'

ReactDOM.render(
  <Provider store={store}>
    <NotificationProvider>
      <ModalProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ModalProvider>
    </NotificationProvider>
  </Provider>,
  document.getElementById('root')
)
