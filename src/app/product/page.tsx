'use client'
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { useEffect } from "react";

export default function Product(){
  const {products, getAllProducts} = useProducts();
  useEffect(()=>{getAllProducts()},[]);

  return(
    <div className="float-left">
      {
        products?.map(value => (
          <ProductCard key={value.id} product={value}/>
        ))
      }
    </div>
  )
}