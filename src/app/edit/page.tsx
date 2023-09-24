'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext';

export default function Edit() {
  const { product, editProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const defaults = 'https://img.freepik.com/fotos-premium/dio-vuelta-dados-cambia-expresion-mi-culpa-predeterminada-hermosa-mesa-madera-fondo-amarillo_606207-712.jpg?w=1060';

  useEffect(() => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, price, image } = formData;
    const id = product.id;
    editProduct({ name, price, image, id });
  };

  return (
    <div className="flex items-center flex-col gap-4">
      <h1 className="text-2xl font-semibold">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="px-2 bg-gray-300 bg-opacity-40 rounded-lg shadow-xl">
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
          <button className="border border-blue-500 p-2 rounded-lg text-blue-500">Editar</button>
        </div>
      </form>
    </div>
  );
}
