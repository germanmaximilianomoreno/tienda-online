import { HelmetProvider, Helmet } from "react-helmet-async"
import Navbar from "../../components/biblioteca/NavBar"
import { useState } from "react"
import Main from "../../components/biblioteca/Main"
import {AiOutlineMenu} from "react-icons/ai"
import {AiOutlineClose} from "react-icons/ai"

function Biblioteca() {

    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Biblioteca mágica</title>
            </Helmet>
            <div className="bg-color-secundary w-full min-h-screen flex justify-center">
                <Navbar showMenu={showMenu} />

                {/*Menu movil*/}
                <nav className="bg-color-3 lg:hidden fixed w-full bottom-0 left-0 text-3xl text-white p-4 flex items-center justify-center rounded-tl-xl rounded-tr-xl z-20'">
                    <button onClick={() => toggleMenu()}>
                        <AiOutlineMenu className={showMenu ? 'hidden' : 'grid'}/>
                        <AiOutlineClose className={showMenu ? 'grid' : 'hidden'}/>
                    </button>
                </nav>

                <Main/>
            </div>
        </HelmetProvider>
    )
}

export default Biblioteca