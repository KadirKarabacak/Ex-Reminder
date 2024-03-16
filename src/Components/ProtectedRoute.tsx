// import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Api/firebase";
import { ProtectedRouteProps } from "../Interfaces/User";

//: Daha sonra spinner için kullanılabilir.
// const FullPage = styled.div`
//     height: 100vh;
//     background-color: var(--color-grey-50);
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
