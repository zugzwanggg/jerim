import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import Register from "./pages/auth/Register"
import AuthLayout from "./pages/auth/AuthLayout"
import Signin from "./pages/auth/Signin"
import { useEffect } from "react"
import Map from "./pages/Map"
import Leaderboard from "./pages/Leaderboard"
import ReportPage from "./pages/ReportPage"
import ProfilePage from "./pages/ProfilePage"
import SearchPage from "./pages/SearchPage"
import { fetchUserIsLogged } from "./features/userSlice/userSlice"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import axios from "axios"

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useAppDispatch();
  const {isLogged, user} = useAppSelector((state)=>state.user);


  const handleTelegramMiniApp = async () => {
    try {
      
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/telegram`, {
        tgId: window.Telegram?.WebApp.initDataUnsafe.user?.id,
        username: window.Telegram?.WebApp.initDataUnsafe.user?.username,
        avatar: window.Telegram?.WebApp.initDataUnsafe.user?.photo_url
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user && window.Telegram?.WebApp.initDataUnsafe.user) {
      handleTelegramMiniApp();
    }
    dispatch(fetchUserIsLogged());
    document.body.classList.add('dark');
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/map" element={<Map />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
          <Route path="/report" element={<ReportPage />}/>
          <Route path="/search" element={<SearchPage />}/>

          <Route path="/profile/:id" element={<ProfilePage />}/>
        </Route>
        <Route path="/auth" element={isLogged ? <Navigate to={'/'}/> : <AuthLayout />}>
          <Route path="register" element={<Register />}/>
          <Route path="signin" element={<Signin />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
