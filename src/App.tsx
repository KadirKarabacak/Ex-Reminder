import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import AppLayout from "./Components/AppLayout";
import Users from "./Pages/Users";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="login" Component={Login} />
                {/* Applayout must be protected before login */}
                <Route Component={AppLayout}>
                    <Route path="/" Component={Home} />
                    <Route path="/about" Component={About} />
                    <Route path="/contact" Component={Contact} />
                    <Route path="/users" Component={Users} />
                    <Route path="/settings" Component={Settings} />
                    <Route path="*" Component={NotFound} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
