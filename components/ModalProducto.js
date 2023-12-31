import { useState, useEffect } from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } =
    useQuiosco();
  const [cantidad, setCatidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    //Comprobar si el Modal actual está en el pedido
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEdicion = pedido.find(
        (pedidoState) => pedidoState.id === producto.id
      );
      setEdicion(true);
      setCatidad(productoEdicion.cantidad);
    }
  }, [producto, pedido]);

  return (
    <div className="md:flex gap-10">
      <div className="flex justify-end mb-4 md:hidden">
        <button onClick={handleChangeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
          className="object-cover border-radius"
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end invisible md:visible">
          <button onClick={handleChangeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-xl md:text-3xl font-bold md:mt-5">
          {producto.nombre}
        </h1>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>
        <div className="flex gap-6 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCatidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              if (cantidad >= 7) return;
              setCatidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-amber-500 hover:bg-amber-400 px-5 py-2 mt-5 text-black font-bold uppercase rounded shadow"
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
        >
          {edicion ? "Guardar Cambios" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
