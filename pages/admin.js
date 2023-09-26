import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import Orden from "../components/Orden";

export default function Admin() {
  const [url, setUrl] = useState("/api/ordenes");

  const cambiarUrl = (nuevaUrl) => {
    setUrl(nuevaUrl);
  };

  const fetcher = () => axios(url).then((datos) => datos.data);
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 100,
  });

  // console.log(data)
  // console.log(error)
  // console.log(isLoading)

  return (
    <AdminLayout pagina={"Admin"}>
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>
        <div className="flex justify-between mb-5">
            <button onClick={() => cambiarUrl("/api/ordenes")} className={`text-xl lg:text-2xl font-bold ${url === "/api/ordenes"? "bg-gray-200 px-5 py-2 rounded-md" : ""} `}>
                Órdenes pendientes
            </button>
            <button onClick={() => cambiarUrl("/api/ordenes/completadas")} className={`text-xl lg:text-2xl font-bold ${url === "/api/ordenes/completadas"? "bg-gray-200 px-5 py-2 rounded-md" : ""} `}>
                Órdenes completadas
            </button>
      </div>
      {data && data.length ? (
        data.map((orden) => <Orden key={orden.id} orden={orden} />)
      ) : (
        <p>No hay órdenes pendientes</p>
      )}
    </AdminLayout>
  );
}
