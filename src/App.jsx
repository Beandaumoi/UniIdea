import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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

function Layout() {
  const location = useLocation();
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
