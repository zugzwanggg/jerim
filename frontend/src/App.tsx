import { BrowserRouter, Route, Routes } from "react-router-dom"
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

function App() {

  useEffect(() => {
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
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />}/>
          <Route path="signin" element={<Signin />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
