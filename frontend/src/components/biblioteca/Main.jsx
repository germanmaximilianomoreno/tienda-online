import { useState } from "react"
import ListaLibros from "./ListaLibros.jsx"
import Lottie from 'react-lottie';
import animationData from '../../assest/img/99605-search.json';
import Nav from "./Nav.jsx";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { deleteToken, getUsuario } from "../../api/entidades.api.js";
import { useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";

function Main() {
    const [selectedCategory, setselectedCategory] = useState();
    const [user, setUser] = useState();
    const [is_superuser, setIs_superuser] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'idUsuario']);
    const [searchValue, setSearchValue] = useState("Vacio");

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const categoriaSeleccionada = (categoria) => {
        setselectedCategory(categoria)
    }

    const cerrarSesion = async () => {
        await deleteToken(cookies.idUsuario)
        setCookie(cookies)
        removeCookie('accessToken');
        removeCookie('idUsuario');
    }

    useEffect(() => {

        const obtenerUsuario = async () => {
            const dataUser = await getUsuario(cookies.idUsuario);
            const correoUser = dataUser.email
            setIs_superuser(dataUser.is_superuser)
            const indiceArroba = correoUser.indexOf('@');

            if (indiceArroba !== -1) {
                let correoSinArroba = correoUser.substring(0, indiceArroba);
                correoSinArroba = correoSinArroba.charAt(0).toUpperCase() + correoSinArroba.slice(1);
                setUser(correoSinArroba);
            }
        };

        obtenerUsuario();
    }, [cookies.idUsuario])

    return (
        <main className="w-full h-full lg:p-10 lg:pt-6 mb-20 lg:pl-48 text-white">

            {/*buscador*/}
            <div className="w-full grid lg:grid-cols-2 content-center">
                <div className="hidden lg:grid content-center">
                    <h1 className="text-4xl font-bold">Biblioteca Mágica</h1>
                </div>

                <div className="w-full grid grid-rows-2 md:grid-rows-1 items-center md:gap-4 p-4 lg:justify-end">
                    <div className="w-full flex row-start-2 md:row-start-1 items-center justify-start">
                        <div>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: animationData
                                }}
                                height={80}
                                width={80}
                                eventListeners={[
                                    {
                                        eventName: 'complete',
                                    }
                                ]}
                            />
                        </div>

                        <form className="w-full">
                            <input
                                className="text-gray-300 bg-color-3 p-2 rounded-lg w-full md:w-auto"
                                type="text"
                                placeholder="Buscar libro por título..."
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-4 row-start-1 md:row-start-1 justify-between md:justify-end">

                        <div className="flex items-center gap-2">
                            <HiOutlineUserCircle className="mx-2" />

                            <p className="font-bold">{user}</p>
                        </div>

                        <div className={`${is_superuser ? "block" : "hidden"}`}>
                            <a href={`${process.env.REACT_APP_BACKEND_URL}`} target="" rel="noopener noreferrer">
                                <AiOutlineSetting />
                            </a>
                        </div>

                        <Link className="block bg-color-principal p-2 rounded-xl" to='/login' onClick={cerrarSesion}>Logout</Link>

                    </div>
                </div>
            </div>

            {/*categorias*/}
            <Nav categoriaSeleccionada={categoriaSeleccionada} />

            {/*contenido*/}
            <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center w-full">
                <ListaLibros selectedCategory={selectedCategory} searchValue={searchValue} />
            </div>
        </main>
    )
}

export default Main