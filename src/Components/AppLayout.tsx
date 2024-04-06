import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import { useGetNegotiates } from "../Api/companyController";
import { auth } from "../Api/firebase";
import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    const [isAlarmActive, setIsAlarmActive] = useState(true);
    const { pathname } = useLocation();
    const { currentUser } = auth;
    const { data: negotiates } = useGetNegotiates(currentUser?.uid);

    const formattedNegotiates = negotiates?.map(neg => {
        return {
            ...neg,
            negotiateDateAndTime: new Date(
                neg.negotiateDateAndTime.seconds * 1000
            ),
        };
    });

    //! This must be in an useEffect maybe
    const findNegotiatesToAlert = formattedNegotiates?.filter(neg => {
        // ! If user don't want to alert, don't take negotiate
        if (!neg.negotiateAlarm) return;

        // ! Alert time from user's selected hour
        const warnTime = neg.negotiateAlarmWarningTime * 60;

        // ! Calculate minutes left to negotiate
        const diff = differenceInMinutes(neg.negotiateDateAndTime, new Date());

        if (diff <= warnTime && !neg.isAlarmDismissed) return neg;
        else return null;
    });

    const handleDismissAlarm = negotiateId => {
        setIsAlarmActive(false);
        toast.dismiss();

        //! Here do updateDoc, and set neg.isAlarmDismissed to true
        const negotiate = formattedNegotiates?.find(
            neg => neg.negotiateId === negotiateId
        );
    };

    useEffect(() => {
        if (findNegotiatesToAlert?.length) setIsAlarmActive(true);
    }, [findNegotiatesToAlert]);

    // useEffect(() => {
    //     if (isAlarmActive)
    //         toast.custom(
    //             <Alarm
    //                 findNegotiatesToAlert={findNegotiatesToAlert}
    //                 handleDismissAlarm={handleDismissAlarm}
    //             />,
    //             {
    //                 duration: isAlarmActive ? 999999999 : 0,
    //             }
    //         );
    // }, [isAlarmActive]);

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
