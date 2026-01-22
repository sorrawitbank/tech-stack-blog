import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Landing from "./pages/Landing";
import ViewPost from "./pages/ViewPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
