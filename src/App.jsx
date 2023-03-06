import Button from "@mui/material/Button";

// import ".././src/App.css";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import Checkout from "./pages/Checkout";
import AuthProvider, { useAuth } from "./firebase/Auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout></Checkout>
            </ProtectedRoute>
          }
        ></Route>
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  );
}

export default App;
