import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { MediaQueryProvider } from "./contexts/MediaQueryContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import AppRoutes from "./routes";
import jwtInterceptor from "./utils/jwtInterceptor";

jwtInterceptor();

function App() {
  return (
    <Router>
      <AuthProvider>
        <CategoryProvider>
          <MediaQueryProvider>
            <ScrollProvider>
              <AppRoutes />
              <Toaster />
            </ScrollProvider>
          </MediaQueryProvider>
        </CategoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
