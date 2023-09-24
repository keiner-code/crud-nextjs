'use client'
import { useProducts } from "@/context/ProductContext";

export default function Products(){
  const {createProduct} = useProducts();
  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as string;
    createProduct({id, name,price,image});
  }

  return (
    <div className="flex items-center flex-col gap-4">
      <h1 className="text-2xl font-semibold">Ingresar Producto</h1>
      <form onSubmit={handlerSubmit} className="px-2 bg-gray-300 bg-opacity-40 rounded-lg shadow-xl">

        <div className="w-full my-4">
          <label htmlFor="name" className="text-gray-600">Nombre</label>
          <input name="name" type="text" className="w-full h-8 rounded-lg"/>
        </div>

        <div className="w-full my-4">
          <label htmlFor="price" className="text-gray-600">Precio</label>
          <input name="price" type="number" className="w-full h-8 rounded-lg"/>
        </div>

        <div className="w-full my-4">
          <label htmlFor="image" className="text-gray-600">Imagen</label>
          <textarea name="image" className="w-full h-20 rounded-lg"></textarea>
        </div>
        <div className="w-full my-4 flex justify-center">
          <button className="border border-green-500 p-2 rounded-lg text-green-500">Guardar</button>
        </div>

      </form>
    </div>
  )
}