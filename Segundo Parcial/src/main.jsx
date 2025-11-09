import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import Aplicacion from './App.jsx'
import './index.css'
import {TemaProvider} from '@context/TemaContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <TemaProvider>
                <Aplicacion/>
            </TemaProvider>
        </BrowserRouter>
    </StrictMode>,
)
