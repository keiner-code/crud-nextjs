import { useProducts } from "@/context/ProductContext";
import { useEffect, useRef, useState } from "react";

type Props = {
  props: {
    title: string;
    message: string;
    color: string;
  };
};

export default function Message({ props }: Props) {
  const { setMessage } = useProducts();
  const [state, setState] = useState<string>("");
  const setMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stateTimeout = setTimeout(() => {
      setState("opacity-0");
    }, 1000);
    const messageTimeout = setTimeout(() => {
      setMessage({
        title: "",
        message: "",
        color: "",
        status: false,
      });
    }, 2000);
    setMessageTimeoutRef.current = messageTimeout;
    return () => {
      clearTimeout(stateTimeout);
      if (setMessageTimeoutRef.current) {
        clearTimeout(setMessageTimeoutRef.current);
      }
    };
  }, [setMessage]);

  return (
    <>
      {props.color === "green" && (
        <div
          className={`fixed right-0 top-20 mr-4 w-1/5 h-14 p-1 bg-green-300 text-gray-500 font-medium rounded-lg transition-opacity duration-1000 ease-out ${state}`}
        >
          <h1>{props.title}</h1>
          <p>{props.message}</p>
        </div>
      )}

      {props.color === "blue" && (
        <div
          className={`fixed right-0 top-20 mr-4 w-1/5 h-14 p-1 bg-blue-300 text-gray-500 font-medium rounded-lg transition-opacity duration-1000 ease-out ${state}`}
        >
          <h1>{props.title}</h1>
          <p>{props.message}</p>
        </div>
      )}

      {props.color === "red" && (
        <div
          className={`fixed right-0 top-20 mr-4 w-1/5 h-14 p-1 bg-red-300 text-gray-500 font-medium rounded-lg transition-opacity duration-1000 ease-out ${state}`}
        >
          <h1>{props.title}</h1>
          <p>{props.message}</p>
        </div>
      )}
    </>
  );
}
