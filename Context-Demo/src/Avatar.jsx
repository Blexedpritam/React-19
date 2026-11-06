import { use } from "react";
import { UserContext } from "./UserContext";

export const Avatar = (isLoading = true) => {
  if(isLoading){
    return <div>Loading User Data...</div>
  }

  const {user , setUser } = use(UserContext);

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