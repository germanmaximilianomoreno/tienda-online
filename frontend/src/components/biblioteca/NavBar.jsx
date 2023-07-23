import { Link, useLocation } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../../assest/img/books.json';

function Navbar(props) {

    const { showMenu } = props;
    const location = useLocation();
    const url = location.pathname;

    return (
        <nav className={` fixed lg:left-0 top-0  h-full bg-color-3 rounded-tr-3xl rounded-br-3xl text-white content-between transition-all z-10 ${showMenu ? "left-0" : "-left-full"}`}>

            <div className="grid gap-4 pt-4 w-36">
                <div className="grid justify-center content-center ">
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
                <div className="grid text-center h-screen ">

                    <ul className="w-36 ">
                        <li className={`block py-3 ${(url === "/") ? "bg-color-secundary" : "bg-color-3"}`}>
                            <Link className="block" to='/'>Tienda</Link>
                        </li>
                        <li className={`block hover:bg-color-secundary py-3 ${(url === "/carrito") ? "bg-color-secundary" : "bg-color-3"}`}>
                            <Link className="block" to='/carrito'>Carrito</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar