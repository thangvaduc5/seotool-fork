import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CommentPage from "./pages/CommentPage";
import ProfilesPage from "./pages/ProfilesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <ProfileProvider>
        <Router>

          <div style={{ marginBottom: '' }}>
            <Header />
          </div>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/comment" element={<CommentPage />} />
          </Routes>

        </Router>
      </ProfileProvider>
    </UserProvider>

  );
};

export default App;
