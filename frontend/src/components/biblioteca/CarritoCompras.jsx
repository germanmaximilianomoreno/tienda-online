import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteAllCarrito } from "../../api/entidades.api";
import ListaCarrito from "./ListaCarrito";
import { useCookies } from 'react-cookie';

function CarritoCompras() {

    // const [showOrder, setShowOrder] = useState(false)
    const [precioTotal, setPrecioTotal] = useState(0);
    const [cookies] = useCookies(['idUsuario']);

    const handleUpdatePrecioTotal = (total) => {
        setPrecioTotal(total);
    };

    const handleDeleteCarrito = async () => {
        await deleteAllCarrito(cookies.idUsuario)
    }

    const precioFormateado = (precio) => precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="bg-color-secundary w-full min-h-screen flex">
            <div className="grid content-center justify-center h-screen m-auto gap-2">
                <div className="text-white bg-color-3 p-4 rounded-lg  xl:h-[33rem] xl:w-[70rem] overflow-y-scroll text-center mt-4">
                    <div className=" bg-color-secundary block p-4 rounded-lg mb-4">
                        <h1 className="text-2xl font-bold ">Carrito de Compras</h1>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6 items-center">
                        <ListaCarrito updatePrecioTotal={handleUpdatePrecioTotal} precioFormateado={precioFormateado} handleDeleteCarrito={handleDeleteCarrito} />
                    </div>
                </div>

                <div className="text-white bg-color-3 p-4 rounded-lg mt-4 text-right mb-2">
                    <h2 className="font-semibold text-2xl">Total: ${precioFormateado(precioTotal)}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3 text-white justify-items-center">
                    <Link className="bg-green-800 p-2 rounded-lg w-44 text-center mb-2">Confirmar compra</Link>
                    <Link className="bg-red-700 p-2 rounded-lg w-44 text-center mb-2" onClick={() => handleDeleteCarrito()}>Eliminar carrito</Link>
                    <Link to="/" className="bg-color-principal p-2 rounded-lg w-44 text-center mb-2">Volver</Link>
                </div>
            </div>
        </div>

    )
}

export default CarritoCompras