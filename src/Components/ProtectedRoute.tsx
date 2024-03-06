// import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Api/firebase";

//: Daha sonra spinner için kullanılabilir.
// const FullPage = styled.div`
//     height: 100vh;
//     background-color: var(--color-grey-50);
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { currentUser } = auth;
    console.log(currentUser);

    // Handle authenticated user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (isAuthenticated) return children;
};

export default ProtectedRoute;
