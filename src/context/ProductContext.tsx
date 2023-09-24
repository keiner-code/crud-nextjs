"use client";
import { Product } from "@/types";
import { createContext, useContext, useState } from "react";


type Message = {
  title: string,
  message: string,
  color: string,
  status: boolean
}

type ContextType = {
  products: Product[] | undefined;
  product: Product,
  removeProduct: Product,
  showProduct: boolean,
  detailsProducts : Product,
  showMessage: Message,
  setDetailsProducts: (product: Product) => void,
  deleteProduct: (id: number) => void,
  changeShowProduct: () => void,
  getAllProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  getByIdProduct: (id: string, currentRouter: string ) => Promise<void>;
  editProduct: (product: Product) => Promise<void>;
  setMessage: (message: Message) => void;
  setProducts: (product: Product[]) => void
};

const initialStateProduct = {
  name: '',
  image: '', 
  price: '', 
  id: 0
}

const initialMessage: Message = {
    title: '',
    message: '',
    color: '',
    status: false
}

const initialState: ContextType = {
  products: undefined,
  product: initialStateProduct,
  showProduct: false,
  removeProduct: initialStateProduct,
  detailsProducts : initialStateProduct,
  showMessage: initialMessage,
  setDetailsProducts: () => {},
  changeShowProduct: () => {},
  getAllProducts: async () => {},
  createProduct: async () => {},
  getByIdProduct: async () => {},
  editProduct: async () => {},
  deleteProduct: async () => {},
  setMessage: async () => {},
  setProducts: () => {} 
}

export const ProductContext = createContext<ContextType>(initialState);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("UseProduct must be used within a ProductContext");
  return context;
};

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>();
  const [detailsProducts, setDetailsProducts] = useState<Product>(initialStateProduct);
  const [product, setProduct] = useState<Product>(initialStateProduct);
  const [removeProduct, setRemoveProduct] = useState<Product>(initialStateProduct);
  const [showProduct,setShowProduct] = useState<boolean>(false);
  const [showMessage,setMessage] = useState<Message>(initialMessage);

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/api/product");
    setProducts(await res.json());
  };

  const createProduct = async (product: Product) => {
    try {
      const url = "http://localhost:3000/api/product";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok){ 
        await getAllProducts();
        setMessage({
          title: 'Producto Agregado',
          message: 'Este Producto ha sido agregago',
          color: 'green',
          status: true
        });
      }
    } catch (error: any) {
      new Error("Error: ", error);
      setMessage({
        title: 'Producto No Agregado',
        message: 'Por Favor Verifique Los Datos',
        color: 'red',
        status: true
      });
    }
  };

  const editProduct = async (product: Product) => {
    try {
      const url = `http://localhost:3000/api/product/${product.id}`;
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (res.ok) {
        await getAllProducts();
        setMessage({
          title: 'Producto Editado',
          message: 'Este Producto Ha Sido Editado',
          color: 'blue',
          status: true
        });
      };
    } catch (error: any) {
      new Error("Error: ", error);
      setMessage({
        title: 'Producto No Editado',
        message: 'Por Favor Verifique Los Datos',
        color: 'red',
        status: true
      });
    }
  }

  const getByIdProduct = async (id: string, currentRouter: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/product/${id}`);
      if (res.status === 404) {
        // Manejar el caso en el que el producto no se encontró (código de estado 404).
        setMessage({
          title: 'Producto No Encontrado',
          message: 'El producto no existe',
          color: 'red',
          status: true
        });
        return; // Salir de la función
      }
  
      if (currentRouter === '/edit') {
        setProduct(await res.json());
      } else {
        setRemoveProduct(await res.json());
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        title: 'Error de Solicitud',
        message: 'Se produjo un error al obtener el producto',
        color: 'red',
        status: true
      });
    }
  };
  
  /* const getByIdProduct = async (id: string, currentRouter: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/product/${id}`);
      currentRouter === '/edit' ? setProduct(await res.json()) : setRemoveProduct(await res.json());
    } catch (error: any) {
      new Error('Message:',error);
      setMessage({
        title: 'Producto No Encontrado',
        message: 'Por Favor Verifique El ID',
        color: 'red',
        status: true
      });
    }
  }; */

  const deleteProduct = async (id: number) => {
    try {  
      const res = await fetch(`http://localhost:3000/api/product/${id}`,{
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        }
      });
      if(res.ok){
        setMessage({
          title: 'Producto Eliminado',
          message: 'Este Producto Ha Sido Eliminado',
          color: 'blue',
          status: true
        });
      }
    } catch (error: any) {
      new Error('message: ',error);
      setMessage({
        title: 'Producto No Eliminado',
        message: 'Este Producto No Ha Sido Eliminado',
        color: 'red',
        status: true
      });
    }
    
  }

  const changeShowProduct = () => {
    setShowProduct(!showProduct);
  }

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        products,
        setProducts,
        removeProduct,
        createProduct,
        product,
        showMessage,
        getByIdProduct,
        editProduct,
        showProduct,
        changeShowProduct,
        detailsProducts,
        setDetailsProducts,
        deleteProduct,
        setMessage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
