import { createContext, useState } from "react";



const Context = createContext()

function ProductContext({children}){
    const [products,setProducts] = useState([])
    const [id,setId] = useState('')
    return(
        <Context.Provider value={{products,setProducts,id,setId}}>{children}</Context.Provider>
    )
}

export {Context, ProductContext}