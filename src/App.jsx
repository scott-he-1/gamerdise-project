import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Confirmation } from "./pages/Confirmation";
import { Home } from "./pages/Home";
import { Layout } from "./pages/layout";
import { Login } from "./pages/Login";
import { SellAnItem } from "./pages/SellAnItem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sellAnItem" element={<SellAnItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmationPage" element={<Confirmation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
