import { AuthContext } from "@/contexto/contextoAuth";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
