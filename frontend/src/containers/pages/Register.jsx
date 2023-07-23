import { HelmetProvider, Helmet } from "react-helmet-async"
import Header from "../../components/register/Header"

function Register() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <Header />
        </HelmetProvider>
    )
}

export default Register