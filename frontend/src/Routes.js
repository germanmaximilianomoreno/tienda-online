import { Route, Routes } from "react-router-dom";
import Error from "./containers/errors/Error";
import { useLocation } from "react-router-dom";
import Carrito from "./containers/pages/Carrito";
import Register from "./containers/pages/Register";
import Login from "./containers/pages/Login";
import { PrivateRoute } from "./PrivateRoute";

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="*" element={<Error />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route exact path='/' element={<PrivateRoute />}></Route>
        </Routes>
    )
}

export default AnimatedRoutes