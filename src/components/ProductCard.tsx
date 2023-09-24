import Image from "next/image"
import { Product } from "@/types"
import { useProducts } from '@/context/ProductContext'
import ProductDetails from "./ProductDetails"

type Props = {
  product: Product
}

export default function ProductCard({product}: Props){
  const {changeShowProduct, showProduct, setDetailsProducts} = useProducts();

  const handlerClick = () => {
    setDetailsProducts(product)
    changeShowProduct();
  }
  return(
    <>
    <button
    onClick={handlerClick}
    >
      <a className="h-120 w-60 rounded shadow-lg mx-auto border border-palette-lighter float-left ml-2 mb-4">
        <div className="h-60 border-b-2 border-palette-lighter relative w-56 ml-2 ">
          <Image
            src={product.image}
            alt="{imageNode.altText}"
            layout="fill"
            className="transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        <div className="h-32 relative w-56 text-center">
          <div className="font-primary text-palette-primary text-2xl pt-2 px-4 font-semibold">
            {product.name}
          </div>
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            They exist
          </div>
          <div
            className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            <span className="text-lg">{product.price}</span>
          </div>
        </div>
      </a>
    </button>
    {showProduct && <ProductDetails/>}
    </>
  )
}