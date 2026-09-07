import { useEffect, useRef } from "react";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import StripeSuccess from "./pages/StripeSuccess";
import { useAuthStore } from "./store/useAuthStore";
import Lenis from "lenis";
import { Loader } from "lucide-react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import BuyCredits from "./pages/BuyCredits";
import MyOrders from "./pages/MyOrders";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import UploadService from "./pages/admin/UploadService";
import AddCategory from "./pages/admin/AddCategory";
import GetAllServices from "./pages/admin/GetAllServices";
import GetAllOrders from "./pages/admin/GetAllOrders";
import Chats from "./pages/admin/Chats";
import Browse from "./pages/Browse";
import ServiceDetails from "./pages/ServiceDetails";

function App() {
  const container = useRef();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className=" flex items-center justify-center h-screen bg-main">
        <Loader className=" animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className=" bg-main text-white bg-[linear-gradient(to_right,#4d4d4d20_1px,transparent_1px),linear-gradient(to_bottom,#4d4d4d20_1px,transparent_1px)] bg-[size:30px_30px]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/fansign/:serviceId" element={<ServiceDetails />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/buy-credits"
          element={authUser ? <BuyCredits /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={authUser ? <MyOrders /> : <Navigate to="/login" />}
        />

        {/* ADMIN ROUTES  */}
        <Route
          path="/dashboard"
          element={
            authUser && authUser.isAdmin ? <Dashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/users"
          element={
            authUser && authUser.isAdmin ? <Users /> : <Navigate to="/" />
          }
        />
        <Route
          path="/upload"
          element={
            authUser && authUser.isAdmin ? (
              <UploadService />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/categories"
          element={
            authUser && authUser.isAdmin ? <AddCategory /> : <Navigate to="/" />
          }
        />
        <Route
          path="/services"
          element={
            authUser && authUser.isAdmin ? (
              <GetAllServices />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/all-orders"
          element={
            authUser && authUser.isAdmin ? (
              <GetAllOrders />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/chats"
          element={
            authUser && authUser.isAdmin ? <Chats /> : <Navigate to="/" />
          }
        />

        {/* ADMIN ROUTES ENDS */}
        <Route
          path="/support"
          element={authUser ? <Chats /> : <Navigate to="/" />}
        />
        <Route path="/success/:billingId/:token" element={<StripeSuccess />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
