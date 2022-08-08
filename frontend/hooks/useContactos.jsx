import { useContext } from "react";
import ContactosContext from "../context/ContactosProvider";

const useContactos = () => {
    return useContext(ContactosContext);
}

export default useContactos;