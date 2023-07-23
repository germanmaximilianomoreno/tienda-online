import { useCallback, useEffect, useState } from 'react'
import { getAllCarrito, getLibro, deleteProductCarrito, updateCarrito } from '../../api/entidades.api';
import Lottie from 'react-lottie';
import animationData from '../../assest/img/98288-loading.json'; // Ruta al archivo JSON de la animación
import { useCookies } from 'react-cookie';

function ListaCarrito({ updatePrecioTotal, precioFormateado, handleDeleteCarrito }) {

    const [carrito, setCarrito] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['idUsuario']);

    const obtenerCarrito = useCallback(async () => {
        // Realizar la lógica para obtener el carrito
        try {
            const respuesta = await getAllCarrito(cookies.idUsuario)
            const registrosCarrito = respuesta.data;

            // Realiza solicitudes para obtener los datos de los libros asociados a cada registro del carrito
            const promesasLibros = registrosCarrito.map(async (registro) => {
                const respuestaLibro = await getLibro(registro.producto)
                const libro = respuestaLibro.data;
                return { ...registro, libro };
            });
            const carritoCompleto = await Promise.all(promesasLibros);
 
            const carritoOrdenado = carritoCompleto.sort((a, b) => a.id - b.id);

            setCarrito(carritoOrdenado);
            setIsLoading(false);

        } catch (error) {
            console.error(error);
        }
    }, [cookies.idUsuario]);

    const handleupdateCarrito = async (id, product) => {
        await updateCarrito(id, product)
            .then(() => obtenerCarrito())
            .catch((error) => console.error(error));
    }

    const handledeleteProductCarrito = async (id) => {
        await deleteProductCarrito(id)
            .then(() => obtenerCarrito())
            .catch((error) => console.error(error));
    }

    const actualizarPrecio = useCallback(() => {
        const total = carrito.reduce((acc, registro) => {
            return acc + registro.libro.precio * registro.cantidad;
        }, 0);
        updatePrecioTotal(total);
    }, [carrito, updatePrecioTotal]);

    useEffect(() => {
        obtenerCarrito();
    }, [handleDeleteCarrito, obtenerCarrito]);

    useEffect(() => {
        actualizarPrecio();
    }, [carrito, actualizarPrecio]);


    return (
        isLoading ? (
            <div className='col-span-3'>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationData
                    }}
                    height={200}
                    width={200}
                    eventListeners={[
                        {
                            eventName: 'complete',
                        }
                    ]}
                /></div>

        ) : (
            carrito.length !== 0 ?
                (carrito.map((registro) => (
                    <div key={registro.id} className='grid gap-4 bg-color-secundary rounded-xl p-4 w-80 overflow-hidden'>
                        <div className='flex gap-4 '>
                            <div>
                                <img src={registro.libro.imagen} alt="" className='w-16 rounded-lg' />
                            </div>
                            <div className='grid gap-4 '>
                                <p>{registro.libro.titulo}</p>
                                <span className='font-semibold text-2xl tracking-wide'>${precioFormateado((registro.libro.precio) * (registro.cantidad))}</span>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={() => {
                                handledeleteProductCarrito(registro.id)
                            }} className="bg-red-600 p-2 rounded-lg">Eliminar</button>

                            <div className='bg-color-principal flex content-center p-2 gap-4 rounded-xl items-center'>
                                <span>Cantidad:</span>
                                <input
                                    id='inputCantidad'
                                    type="number"
                                    className="w-16 rounded p-1 text-while bg-color-secundary  "
                                    min="1"
                                    max="100"
                                    value={registro.cantidad}
                                    onChange={(e) => {
                                        const product = {
                                            'cantidad': parseInt(e.target.value),
                                            'producto': registro.libro.id,
                                            'usuario': cookies.idUsuario
                                        }
                                        handleupdateCarrito(registro.id, product)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))) :
                (<div className="grid col-span-3 gap-4 text-center mt-20">
                    <span className='col-span-5 text-center'> Todavia no hay productos agregados al carrito...</span>
                </div>)
        )
    );
}

export default ListaCarrito