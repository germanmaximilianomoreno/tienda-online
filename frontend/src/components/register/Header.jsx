import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { postRegister } from "../../api/entidades.api";
import Lottie from 'react-lottie';
import animationData from '../../assest/img/98288-loading.json';
import { GiArchiveRegister } from "react-icons/gi";

function Header() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailExist, setEmailExist] = useState('');
    const [camposCompletos, setCSamposCompletos] = useState(true);
    const [passwordIguales, setPasswordIguales] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegistro = async (e) => {
        e.preventDefault()

        if (email && password && confirmPassword) {
            if (password === confirmPassword) {
                const cliente = {
                    'email': email,
                    'password': password
                }
                setIsLoading(true)

                const res = await postRegister(cliente)

                setIsLoading(false)

                if (res.data === "Ya existe") {
                    setEmailExist(true)
                    setPasswordIguales(true)
                } else {
                    window.location.href = 'https://bibliotecamagica.onrender.com/'
                }
            } else {
                setPasswordIguales(false)
                setEmailExist(false)
            }

            setCSamposCompletos(true)
        } else {
            setCSamposCompletos(false)
            setPasswordIguales(true)
        }
    };
    useEffect(() => {

    }, [email, password, confirmPassword])
    return (
        <div className="w-full h-screen bg-background-header bg-cover grid sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 text-white ">
            <div className="hidden col-start-1 lg:grid content-center justify-items-center p-10 ">
                <div className="grid gap-6">
                    <h4 className="text-4xl">Bienvenido a</h4>
                    <h1 className="text-8xl tracking-widest font-bold">Biblioteca Mágica</h1>
                    <p className="text-2xl tracking-widest">¡Todos los libros que estabas buscando!</p>
                </div>
            </div>
            <div className=" bg-gray-950/80 lg:col-start-2 grid content-center justify-center">
                <div className="grid justify-center gap-6 text-center">

                    <div className="flex justify-center items-center gap-2">
                        <h4 className="text-3xl tracking-widest">Registrarse</h4>
                        <GiArchiveRegister className="text-3xl"/>
                    </div>

                    <form className="grid grid-cols-1 gap-4" onSubmit={handleRegistro}>
                        <input className={`bg-color-secundary rounded-md lg:h-[3rem] lg:w-[30rem] border-l-8 border-l-color-principal p-3 `} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <p className={`text-red-700 ${emailExist ? "block" : "hidden"}`}>El Email ya existe</p>

                        <input className="bg-color-secundary rounded-md lg:h-[3rem] lg:w-[30rem] border-l-8 border-l-color-principal p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <input className="bg-color-secundary rounded-md lg:h-[3rem] lg:w-[30rem] border-l-8 border-l-color-principal p-3" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                        <p className={`text-red-700 ${camposCompletos ? "hidden" : "block"}`}>Debe completar todos los campos</p>

                        <p className={`text-red-700 ${passwordIguales ? "hidden" : "block"}`}>Las contraseñas deben ser iguales</p>

                        <div className="flex gap-2 justify-center tracking-widest">
                            <p>¿Ya estas registrado?</p>
                            <Link to='/login' className="text-color-principal" href="">Iniciar sesión</Link>
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

                        <button className="bg-color-principal h-12 rounded-3xl tracking-widest text-xl" type="submit">Registrarse</button>
                        <Link to='/' className="text-xs">Volver atras</Link>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Header