import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import Image from "next/image";

export default function ProductDetails() {
  const {changeShowProduct, detailsProducts} = useProducts();
  
  return (
    <div className="fixed w-full bg-gray-500 top-0 left-0 bottom-0 bg-opacity-30">
      <div className="flex items-center justify-center h-screen">
        <div className="flex w-1/2 flex-col p-4 bg-slate-500 bg-opacity-50 shadow-lg rounded-lg">
          <h2 className="text-center pb-2 border-b-[1px] border-b-gray-400 font-medium text-xl text-white">
            Detalle Del Producto
          </h2>
          <div className="flex pt-2">
          
            <Image
              className="rounded-lg"
              width={300}
              height={300}
              src={detailsProducts.image}
              alt={detailsProducts.name}
            />
            <div className="pl-4">
              <p className="text-lg text-white">{detailsProducts.name}</p>
              <p className="w-full text-white mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Possimus suscipit voluptatem expedita eligendi, voluptas eum
                illum ex. Ullam, illum! Tempora necessitatibus magni officiis
                perspiciatis odio animi, velit quod quis architecto?
              </p>
              <p className="mt-4 text-white">
                Precio: <strong className="text-white">{detailsProducts.price} $</strong>
              </p>
           
              <div className="w-full text-right mt-10">
              <button onClick={changeShowProduct} className="text-right text-blue-300">Regresar</button>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
