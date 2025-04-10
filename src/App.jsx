import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { setToken } from "./redux/authSlice";
import {
  ChangePasswordScreen,
  ForgotPasswordScreen,
  HomeScreens,
  IdeaRegisterScreen,
  ListIdeaScreen,
  LoginScreen,
  NewspaperScreen,
  RegisterScreen,
  UserProfileScreen,
} from "./screens/index";
import { Navbar, Footer } from "./component/index";

function useAuthPersistence() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user")) || {};

    if (token) {
      dispatch(setToken({ token, user }));
    }
  }, [dispatch]);
}

function Layout() {
  const location = useLocation();
  useAuthPersistence();
  const hideHeaderFooter = [
    "/login",
    "/register",
    "/forgot-password",
    "/change-password",
  ].includes(location.pathname);
  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeScreens />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/idea-register" element={<IdeaRegisterScreen />} />
        <Route path="/newspaper" element={<NewspaperScreen />} />
        <Route path="/list-idea" element={<ListIdeaScreen />} />
        <Route path="/user-profile" element={<UserProfileScreen />} />
        <Route path="/change-password" element={<ChangePasswordScreen />} />
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
