import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Insight } from "./pages/Insight";
import { Login } from "./pages/Login";
import { DefaultLayoutSign } from "./layouts/DefaultLayoutSign";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<DefaultLayoutSign />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/register" element={<DefaultLayoutSign />}>
        <Route index element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/insight" element={<Insight />} />
        </Route>
      </Route>
    </Routes>
  );
}
