import { createContext } from "react";

export const UserContext = createContext({
    user : {name:"Guest", role: "Visitor", theme:"light"},
    setUser : () => {},
});
