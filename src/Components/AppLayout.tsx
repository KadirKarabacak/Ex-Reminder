import { Outlet, useLocation } from "react-router-dom";
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

const Container = styled.div`
    max-width: 100%;
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

// const Main = styled.main`
//     background-color: var(--color-grey-50);
//     padding: ${props => (props.pathname === "/" ? "0" : "3.5rem")};
//     overflow-y: scroll;
// `;

// Parent Route
function AppLayout() {
    const { pathname } = useLocation();
    return (
        <ProtectedRoute>
            <StyledAppLayout>
                <Header />
                <Sidebar />
                <main
                    style={{
                        backgroundColor: "var(--color-grey-50)",
                        padding: pathname === "/" ? "0" : "3.5rem",
                        overflowY: "scroll",
                    }}
                >
                    <Container>
                        <Outlet />
                    </Container>
                </main>
            </StyledAppLayout>
        </ProtectedRoute>
    );
}

export default AppLayout;
