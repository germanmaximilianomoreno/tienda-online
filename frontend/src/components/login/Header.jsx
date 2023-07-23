import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getAllLibros, postLogin } from "../../api/entidades.api";
import Lottie from 'react-lottie';
import animationData from '../../assest/img/98288-loading.json';
import { MdLogin } from "react-icons/md";

function Header() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            const cliente = {
                'email': email,
                'password': password
            }
            setIsLoading(true)

            const respuesta = await postLogin(cliente)

            setIsLoading(false)

            setRes(respuesta.data.success)
            if (respuesta.data.success === true) {
                setEmail('');
                setPassword('');
            }
        } else {
            setRes("vacio")
        }
    };

    useEffect(() => {
        getAllLibros()
    }, [res])

    return (
        <div className="w-full h-screen bg-background-header bg-cover grid sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 text-white">
            <div className="hidden col-start-1 lg:grid content-center justify-items-center p-10 ">
                <div className="grid gap-6">
                    <h4 className="text-4xl">Bienvenido a</h4>
                    <h1 className="text-8xl tracking-widest font-bold">Biblioteca Mágica</h1>
                    <p className="text-2xl tracking-widest">¡Todos los libros que estabas buscando!</p>
                </div>
            </div>
            <div className=" bg-gray-950/80 lg:col-start-2 grid content-center justify-center">
                <div className="grid justify-center gap-6 text-center ">
                    <div className="flex items-center justify-center gap-2">
                        <h4 className="text-3xl tracking-widest">Iniciar sesión</h4>
                        <MdLogin className="text-3xl"/>
                    </div>

                    <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
                        <input className="bg-color-secundary rounded-md lg:h-[3rem] lg:w-[30rem] border-l-8 border-l-color-principal p-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <p className={`text-red-700 ${res === "Email not registered" ? "block" : "hidden"}`}>Email no registrado</p>

                        <input className="bg-color-secundary rounded-md lg:h-[3rem] lg:w-[30rem] border-l-8 border-l-color-principal p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <p className={`text-red-700 ${res === false ? "block" : "hidden"}`}>Contraseña incorrecta</p>

                        <p className={`text-red-700 ${res === "vacio" ? "block" : "hidden"}`}>Debe completar todos los campos</p>

                        <div className="flex gap-2 justify-center tracking-widest">
                            <p>¿No estas registrado?</p>
                            <Link to='/register' className="text-color-principal" href="">Registrarse</Link>
                        </div>

                        <div className={isLoading ? 'grid' : 'hidden'}>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: animationData
                                }}
                                height={50}
                                width={50}
                                eventListeners={[
                                    {
                                        eventName: 'complete',
                                    }
                                ]}
                            />
                        </div>

                        <button className="w-full bg-color-principal h-12 rounded-3xl tracking-widest text-xl grid grid-cols-1 content-center" type="submit">Ingresar</button>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Header