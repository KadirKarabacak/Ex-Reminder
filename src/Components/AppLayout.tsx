import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import { useGetNegotiates, useUpdateNegotiate } from "../Api/companyController";
import { auth } from "../Api/firebase";
import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import Alarm from "./Alarm";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Container = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

// Parent Route
function AppLayout() {
    const { pathname } = useLocation();
    const { currentUser } = auth;
    const { data: negotiates } = useGetNegotiates(currentUser?.uid);
    const userId = currentUser?.uid;
    const { isPending, mutateAsync: updateNegotiate } = useUpdateNegotiate();
    const [isAlarm, setIsAlarm] = useState(false);

    //! This must be in an useEffect maybe
    const findNegotiateToAlert = negotiates?.filter(neg => {
        // ! If user don't want to alert, don't take negotiate
        if (!neg.negotiateAlarm) return;

        // ! Alert time from user's selected hour
        const warnTime = neg.negotiateAlarmWarningTime * 60;

        // ! Calculate minutes left to negotiate
        const diff = differenceInMinutes(
            neg.negotiateDateAndTime.seconds * 1000,
            new Date()
        );
        if (diff <= warnTime && !neg.isAlarmDismissed) return neg;
        else return null;
    });

    useEffect(() => {
        if (findNegotiateToAlert && findNegotiateToAlert?.length > 0) {
            setIsAlarm(true);
        }
    }, [findNegotiateToAlert?.length]);

    // ! Maybe i should remove this code from here to <Alarm />
    const handleDismissAlarm = (id: string) => {
        const findNegotiate = negotiates?.find(neg => neg.negotiateId === id);
        const negotiate = { ...findNegotiate, isAlarmDismissed: true };
        updateNegotiate({ negotiate, id, userId });
        !isPending && setIsAlarm(false);
    };

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
                    {isAlarm &&
                        findNegotiateToAlert?.map(neg => (
                            <Alarm
                                findNegotiateToAlert={neg}
                                handleDismissAlarm={handleDismissAlarm}
                            />
                        ))}
                </main>
            </StyledAppLayout>
        </ProtectedRoute>
    );
}

export default AppLayout;
