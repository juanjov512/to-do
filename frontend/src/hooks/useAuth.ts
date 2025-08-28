import { AuthContext } from "@/contexto/contextoAuth";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within a ContextoAuthProvider');
    }
    return context;
};
