import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import ProtectedRoute from "./ProtectedRoute";

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

// Parent Route
function AppLayout() {
    return (
        <ProtectedRoute>
            <StyledAppLayout>
                <Header />
                <Sidebar />
                <Main>
                    <Container>
                        <Outlet />
                    </Container>
                </Main>
            </StyledAppLayout>
        </ProtectedRoute>
    );
}

export default AppLayout;
