import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { setUserToken } from "./redux/authSlice";
import { setAdminToken } from "./redux/adminSlice";

import {
  ChangePasswordScreen,
  ForgotPasswordScreen,
  HomeScreens,
  IdeaRegisterScreen,
  ListIdeaScreen,
  LoginScreen,
  NewspaperScreen,
  RegisterScreen,
  RuleScreen,
  UserProfileScreen,
  ProjectManager,
} from "./screens/index";

import { Navbar, Footer } from "./component/index";

function useAuthPersistence() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (token && user) {
      dispatch(setUserToken({ token, user }));
    }
  }, [dispatch]);
}

// function useAdminPersistence() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     const adminData = localStorage.getItem("adminUser");
//     const admin = adminData ? JSON.parse(adminData) : null;

//     if (token && admin) {
//       dispatch(setAdminToken({ token, admin }));
//     }
//   }, [dispatch]);
// }
function useAdminPersistence() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminUser");

    let admin = null;
    try {
      if (adminData && adminData !== "undefined" && adminData !== "null") {
        admin = JSON.parse(adminData);
      }
    } catch (err) {
      console.error("❌ Lỗi khi parse adminUser:", err);
    }

    if (token && admin) {
      dispatch(setAdminToken({ token, admin }));
    }
  }, [dispatch]);
}

function Layout() {
  const location = useLocation();
  useAuthPersistence();
  useAdminPersistence();

  console.log("📍 [Layout] location.pathname:", location.pathname);
  const hideHeaderFooter = [
    "/login",
    "/register",
    "/forgot-password",
    "/change-password",
    "/admin",
  ].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/admin" element={<ProjectManager />} />
        <Route path="/" element={<HomeScreens />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/idea-register" element={<IdeaRegisterScreen />} />
        <Route path="/newspaper/:id" element={<NewspaperScreen />} />
        <Route path="/list-idea" element={<ListIdeaScreen />} />
        <Route path="/user-profile" element={<UserProfileScreen />} />
        <Route path="/change-password" element={<ChangePasswordScreen />} />
        <Route path="/regulation" element={<RuleScreen />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
