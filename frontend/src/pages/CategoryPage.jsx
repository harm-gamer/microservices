import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const  {getProductByCategory,products} = useProductStore();
 
  const {category} = useParams();
  
  useEffect(() =>{
    getProductByCategory(category);
  },[getProductByCategory,products]);
  return (
    <div>
       {
        products?.map((product) => (
          <ProductCard  key={product._id} product={product}/>
        ))
       }
    </div>
  )
}

export default CategoryPage
