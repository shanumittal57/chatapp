import UserLogin from "./components/userLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserChat from "./components/UserChat";
import NotFound from "./components/NotFound";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLogin />,
    },
    {
      path:"/chat",
      element: <UserChat />
    },
    {
      path:"*",
      element: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
