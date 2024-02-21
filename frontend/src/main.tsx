import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import "./index.css"
import { Home } from "./pages/home"
import { Todos } from "./pages/todos"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/todos",
    element: <Todos />
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
)
