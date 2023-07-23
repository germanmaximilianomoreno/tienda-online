import Header from "../../components/login/Header"
import { HelmetProvider, Helmet } from "react-helmet-async"

function Login() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Header />
        </HelmetProvider>
    )
}

export default Login