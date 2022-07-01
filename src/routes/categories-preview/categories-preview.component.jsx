import { useContext, Fragment} from 'react'
import { CategoriesContext } from '../../context/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
    // const { products } = useContext(CategoriesContext);
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </Fragment>
       
    );
};

export default CategoriesPreview
