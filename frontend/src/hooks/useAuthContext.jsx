import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('the context must be used inside the provider');
    }

    return context;
}