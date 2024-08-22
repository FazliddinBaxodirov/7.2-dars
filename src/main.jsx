import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductContext } from './Hooks/Context.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ProductContext>
            <App />
        </ProductContext>
    </BrowserRouter>
)
