import { HelmetProvider, Helmet } from "react-helmet-async"
import CarritoCompras from "../../components/biblioteca/CarritoCompras"

function Carrito() {
    return (
            <HelmetProvider>
                <Helmet>
                    <title>Carrito</title>
                </Helmet>
                <CarritoCompras />
            </HelmetProvider>
    )
}

export default Carrito