import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const RutaPrivada = (props) => {

    const { auth, cargando } = useAuth();
    const router = useRouter();

    if (cargando) return "Cargando...";

    if(!auth._id) {
        router.push('/login')
    }

    return (

        <>
            {auth._id && props.children}
        </>

    )
}

export default RutaPrivada