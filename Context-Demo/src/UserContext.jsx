import { createContext } from "react";

export const UserContext = createContext({
    name:"Guest",
    role: "Visitor",
    theme:"light",
});
