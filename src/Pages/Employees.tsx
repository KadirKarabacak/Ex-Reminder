import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { springOptions } from "../Constants/constant";
import CustomTable from "../Components/Table";
import { EmployeeToolBar } from "../Components/TableToolBars/EmployeeBar";
import { InfinitySpin } from "react-loader-spinner";
import { useGetEmployees } from "../Api/employeeController";
import { CustomPieChart } from "../Components/CustomPieChart";
import EmployeeStats from "../Components/EmployeeStats";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteOutline } from "@mui/icons-material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const StyledEmployees = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InformationContainer = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const AnimatedStyledEmployees = animated(StyledEmployees);

export default function Employees() {
    const animationProps = useSpring(springOptions);
    const { data, isLoading } = useGetEmployees();
    const [opensEdit, setOpensEdit] = React.useState(false);
    const [opensDelete, setOpensDelete] = React.useState(false);
    const [opensDetail, setOpensDetail] = React.useState(false);
    const employee = true;
    const { t } = useTranslation();

    const buttonGroups = [
        {
            label: "Edit",
            handleOpen: () => setOpensEdit(true),
            handleClose: () => setOpensEdit(false),
            opens: opensEdit,
            startIcon: <EditIcon />,
        },
        {
            label: "Detail",
            handleOpen: () => setOpensDetail(true),
            handleClose: () => setOpensDetail(false),
            opens: opensDelete,
            startIcon: <ReadMoreIcon />,
        },
        {
            label: "Delete",
            handleOpen: () => setOpensDelete(true),
            handleClose: () => setOpensDelete(false),
            opens: opensDetail,
            startIcon: <DeleteOutline />,
        },
    ];

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    return (
        <AnimatedStyledEmployees style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Employees")}</title>
            </Helmet>
            <CustomTable
                CustomToolbar={<EmployeeToolBar />}
                data={data}
                employee={employee}
            />
            <InformationContainer>
                <CustomPieChart data={data} />
                <EmployeeStats data={data} />
            </InformationContainer>
        </AnimatedStyledEmployees>
    );
}
