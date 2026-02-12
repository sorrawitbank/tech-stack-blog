import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { MediaQueryProvider } from "./contexts/MediaQueryContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import Landing from "./pages/Landing";
import ViewPost from "./pages/ViewPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Member/Profile";
import ResetPassword from "./pages/Member/ResetPassword";

function App() {
  return (
    <Router>
      <MediaQueryProvider>
        <ScrollProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/post/:postId" element={<ViewPost />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </ScrollProvider>
      </MediaQueryProvider>
    </Router>
  );
}

export default App;
