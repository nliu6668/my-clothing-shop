// import { useContext,Fragment } from 'react'
// import { CategoriesContext } from '../../context/categories.context'
// import ProductCard from  '../../components/product-card/product-card.component'
// import CategoryPreview from '../../components/category-preview/category-preview.component'

import {Routes,Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component'
import './shop.styles.scss'

const Shop = () => {
  return (
    <Routes>
            <Route index element ={<CategoriesPreview />} />
            <Route path=":category" element= {<Category />} />
    </Routes>
  )
};

export default Shop

{/* <Fragment>
{Object.keys(categoriesMap).map(title => (
    <Fragment key={title}>
        <h2>{title}</h2>
        <div className='products-container'>
            {
                categoriesMap[title].map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }   
        </div>
    </Fragment>
))}       
</Fragment>  */}