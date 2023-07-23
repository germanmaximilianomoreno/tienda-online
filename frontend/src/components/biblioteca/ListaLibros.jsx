import { useEffect, useState } from 'react'
import { createProductCarrito, getAllLibros, getAllLibrosByCategory, getAllLibrosByTitle, getCarritoByIdProducto, updateCarrito } from '../../api/entidades.api';
import Lottie from 'react-lottie';
import animationData from '../../assest/img/98288-loading.json';
import { useCookies } from 'react-cookie';

function ListaLibros({ selectedCategory, searchValue }) {

    const [libros, setLibros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['idUsuario']);

    useEffect(() => {
            if (searchValue === "Vacio" || searchValue === "") {
                if (selectedCategory !== "Todo") {
                    try {
                        async function loadLibrosByCategory() {
                            const res = await getAllLibrosByCategory(selectedCategory)
                            setLibros(res.data);
                        }
                        loadLibrosByCategory()
                        setTimeout(function () {
                            setIsLoading(false);
                        }, 1000);

                    } catch (error) {
                        console.error('Error al obtener los datos:', error);
                    }

                } else {
                    try {
                        async function loadLibros() {
                            const res = await getAllLibros();
                            setLibros(res.data);
                        }
                        loadLibros();
                        setTimeout(function () {
                            setIsLoading(false);
                        }, 1000);
                    } catch (error) {
                        console.error('Error al obtener los datos:', error);
                    }

                }
            } else {
                try {
                    async function loadLibrosByTitle() {
                        const res = await getAllLibrosByTitle(searchValue.toUpperCase())
                        setLibros(res.data);
                    }
                    loadLibrosByTitle()
                    setTimeout(function () {
                        setIsLoading(false);
                    }, 1000);

                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            }

    }, [selectedCategory, searchValue]);

    const handleLibroClick = async (data) => {
        const res = await getCarritoByIdProducto(data.id, cookies.idUsuario);
        if (res.data.length !== 0) {
            const product = {
                'cantidad': res.data[0].cantidad + 1,
                'producto': data.id,
                'usuario': cookies.idUsuario
            }
            await updateCarrito(res.data[0].id, product)
        } else {
            const product = {
                'cantidad': 1,
                'producto': data.id,
                'usuario': cookies.idUsuario
            }
            await createProductCarrito(product)
        }
    };

    const transformString = (cadena) => {
        const lowercased = cadena.toLowerCase();
        return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
      };

    return (
        isLoading ? (
            <div className='col-span-4'>
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
            libros.map((data) => {
                return (
                    <div key={data.id} className="bg-color-3 p-5 w-[14rem] grid gap-2 justify-center rounded-xl overflow-hidden  text-center items-center">
                        <div className='w-[full] h-[18rem] overflow-hidden'>
                            <img className='w-full h-full overflow-hidden bg-cover bg-origin-border rounded-xl' src={data.imagen} alt="" />
                        </div>
                        <div className='text-center'>
                            <h2>{transformString(data.titulo)}: {transformString(data.subtitulo)}</h2>
                            <p className='font-semibold'>${data.precio}</p>
                        </div>
                        <button onClick={() => handleLibroClick(data)}
                            className='bg-color-principal p-2 rounded-lg' >Añadir al carrito</button>
                    </div>
                )
            })
        )
    )
}

export default ListaLibros