import { createContext, useState, useEffect } from 'react'
// import PRODUCTS from '../shop-data.json'
// import SHOP_DATA from '../shop_data'
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    //use json data file
    // const [products, setProducts] = useState(PRODUCTS);
    //categoriesMap is map, not array any more

    const [categoriesMap, setCategoriesMap] = useState({});
  

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);
          
            setCategoriesMap(categoriesMap);
        }
        
        getCategoriesMap();  
        
    },[]);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value = {value}>
            {children}
        </CategoriesContext.Provider>
    )

        //only fire this one time, delete it after writing into database
    // useEffect(() => {     
    //     addCollectionAndDocuments('categories',SHOP_DATA);
    // }, []);

}


