import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import VerifyAccount from "./Pages/auth/VerifyAccount";
import ResetPassword from "./Pages/auth/ResetPassword";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import Home from "./Pages/home/Home";
import CreatePost from "./Pages/home/CreatePost";
import Settings from "./Pages/home/Settings";
import { Toaster } from "react-hot-toast";
import NotFound from "./Pages/home/NotFound";
import PrivateRoutes from "./Components/PrivateRoutes";
import ResendVerificationMail from "./Pages/auth/ResendVerificationMail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Home Routes, not require auth */}
        <Route index path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account/:id" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/resent-verification-mail" element={<ResendVerificationMail />} />

        {/* Home Routes, require auth */}
        <Route element={<PrivateRoutes />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
