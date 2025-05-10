import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 z-0">
        <img 
          src="/signup-background.png" 
          alt="background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 mx-2">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout