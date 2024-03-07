import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 3.5rem;
    overflow-y: scroll;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

// Parent Route
function AppLayout() {
    return (
        <ProtectedRoute>
            <QueryClientProvider client={queryClient}>
                <StyledAppLayout>
                    <Header />
                    <Sidebar />
                    <Main>
                        <Container>
                            <Outlet />
                        </Container>
                    </Main>
                    <Toaster
                        position="bottom-left"
                        gutter={12}
                        containerStyle={{ margin: "8px" }}
                        toastOptions={{
                            success: {
                                duration: 4000,
                            },
                            error: {
                                duration: 5000,
                            },
                            style: {
                                fontSize: "16px",
                                maxWidth: "500px",
                                padding: "16px 24px",
                                backgroundColor: "var(--color-grey-0)",
                                color: "var(--color-grey-700)",
                            },
                        }}
                    />
                </StyledAppLayout>
            </QueryClientProvider>
        </ProtectedRoute>
    );
}

export default AppLayout;
