import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <Toaster position="top-center"/>
  </Provider>
)
