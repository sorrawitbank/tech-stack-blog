import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { MediaQueryProvider } from "./contexts/MediaQueryContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import AppRoutes from "./routes";
import jwtInterceptor from "./utils/jwtInterceptor";

jwtInterceptor();

function App() {
  return (
    <Router>
      <AuthProvider>
        <MediaQueryProvider>
          <ScrollProvider>
            <AppRoutes />
            <Toaster />
          </ScrollProvider>
        </MediaQueryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
