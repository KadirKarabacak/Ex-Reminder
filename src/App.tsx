import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import AppLayout from "./Components/AppLayout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={AppLayout}>
                    <Route path="/" Component={Home} />
                    <Route path="/about" Component={About} />
                    <Route path="/contact" Component={Contact} />
                    <Route path="*" Component={NotFound} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
