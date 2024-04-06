import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import AppLayout from "./Components/AppLayout";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgotPassword from "./Pages/ForgotPassword";
import Employees from "./Pages/Employees";
import Warehouse from "./Pages/Warehouse";
import Companies from "./Pages/Companies";
import { AnimatePresence } from "framer-motion";
import Accounting from "./Pages/Accounting";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AnimatePresence mode="wait">
                    <Routes key={location.pathname}>
                        <Route index path="login" Component={Login} />
                        <Route path="/register" Component={Register} />
                        <Route
                            path="/forgotpassword"
                            Component={ForgotPassword}
                        />
                        <Route path="*" Component={NotFound} />
                        <Route Component={AppLayout}>
                            <Route path="/" Component={Home} />
                            <Route
                                key="companies"
                                path="/companies"
                                Component={Companies}
                            >
                                <Route
                                    key="companyId"
                                    path=":companyId"
                                    Component={null}
                                />
                            </Route>
                            <Route path="/accounting" Component={Accounting} />
                            <Route path="/warehouse" Component={Warehouse} />
                            <Route path="/employees" Component={Employees} />
                            <Route path="/settings" Component={Settings} />
                        </Route>
                    </Routes>
                </AnimatePresence>

                <Toaster
                    position="bottom-left"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 7000,
                        },
                        error: {
                            duration: 7000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "400px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-100)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
            </BrowserRouter>
        </QueryClientProvider>
    );
}
