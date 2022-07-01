import {createContext, useState, useEffect} from 'react'
import {getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const ProductsContext = createContext({
    products: [],
});

export const ProductProvider = ({ children }) => {
    const [products, setProducts ] = useState([]);

    const value = { products };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        }
        getCategoriesAndDocuments();
    }, [])
    
    return (
        <ProductsContext.Provider value = {value}>
            {children}
        </ProductsContext.Provider>
    );
};