import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {Store,persistor} from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-tailwind/react";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
         <App/>
         </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
