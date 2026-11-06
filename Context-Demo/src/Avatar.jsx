import { useContext } from "react";
import { UserContext } from "./UserContext";

export const Avatar = () => {
  const {user , setUser } = useContext(UserContext);

  const toggleTheme = () => {
    setUser({
      ...user,
      theme : user.theme === "dark" ? "light" : "dark" ,
    });
  };
  return(
    <div>
      <p>Welcome ,{user.name}</p>
      <p>Current theme : {user.theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  )
};