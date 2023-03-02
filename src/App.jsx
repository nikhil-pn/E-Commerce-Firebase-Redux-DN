import Button from "@mui/material/Button";

import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<h1>THis is index page</h1>} />
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
