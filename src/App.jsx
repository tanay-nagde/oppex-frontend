import { Route, Routes } from "react-router"
import Dashboard from "./pages/DashboardPage"
import LoginSignupPage from "./pages/LoginSignupPage"
import OTPPage from "./pages/VerifyOtpPage"


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/otp/:id" element={<OTPPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
