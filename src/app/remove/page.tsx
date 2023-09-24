'use client'
import React, {useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types';
import Image from 'next/image';

export default function Remove() {
  const { removeProduct, deleteProduct } = useProducts();
  const [formData, setFormData] = useState<Product>({
    name: removeProduct.name,
    price: removeProduct.price.toString(),
    image: removeProduct.image,
    id: removeProduct.id
  });
  const defaults = 'https://img.freepik.com/fotos-premium/dio-vuelta-dados-cambia-expresion-mi-culpa-predeterminada-hermosa-mesa-madera-fondo-amarillo_606207-712.jpg?w=1060';

  useEffect(() => {
    setFormData({
      name: removeProduct.name,
      price: removeProduct.price.toString(),
      image: removeProduct.image,
      id: removeProduct.id
    });
  }, [removeProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="flex items-center flex-col gap-4">
      <h1 className="text-2xl font-semibold">Eliminar Producto</h1>
      <div className="px-2 bg-gray-300 bg-opacity-40 rounded-lg shadow-xl">
        <div className="w-full my-4">
          <label htmlFor="name" className="text-gray-600">
            Nombre
          </label>
          <input
            name="name"
            value={formData.name}
            type="text"
            className="w-full h-8 rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div className="w-full my-4">
          <label htmlFor="price" className="text-gray-600">
            Precio
          </label>
          <input
            name="price"
            value={parseInt(formData.price) || 0}
            type="number"
            className="w-full h-8 rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div className="w-full my-4">
          <label htmlFor="image" className="text-gray-600">
            Imagen
          </label>
          <img src={formData.image ? formData.image : defaults} className="w-full h-40 rounded-lg"/>
        </div>

        <div className="w-full my-4 flex justify-center">
          <button onClick={() => deleteProduct(formData.id)} className="border border-red-500 p-2 rounded-lg text-red-500">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

