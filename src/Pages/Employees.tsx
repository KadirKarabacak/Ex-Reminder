import { animated, easings, useSpring } from "react-spring";
import styled from "styled-components";
import CustomTable from "../Components/Table";
import { EmployeeToolBar } from "../Components/TableToolBars/EmployeeBar";
import { InfinitySpin } from "react-loader-spinner";
import { useGetEmployees } from "../Api/employeeController";
import { CustomPieChart } from "../Components/CustomPieChart";
import EmployeeStats from "../Components/EmployeeStats";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CallBackProps } from "react-joyride";
import CustomJoyride from "../Components/CustomJoyride";
import i18n from "../i18n";
import JoyrideTitle from "../Components/JoyrideTitle";
import GroupIcon from "@mui/icons-material/Group";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import EngineeringIcon from "@mui/icons-material/Engineering";

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

    @media (max-width: 1000px) {
        border-radius: 0;
        padding: 1rem;
    }
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InformationContainer = styled.div`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 1000px) {
        grid-template-columns: auto;
    }
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-300)",
    transition: "all .3s",
};

const employeeSteps = [
    {
        target: ".addEmployee-btn",
        content: i18n.t(
            "You can add your employees working in your company to your table here."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<GroupIcon sx={iconStyle} />}
                title={i18n.t("Add Employees")}
            />
        ),
    },
    {
        target: ".export-btn-employee",
        content: i18n.t(
            "Here you can print out all employee data in your table as PDF or Excel."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<FileDownloadIcon sx={iconStyle} />}
                title={i18n.t("Export Data")}
            />
        ),
    },
    {
        target: ".search-input-employee",
        content: i18n.t(
            "From here, you can find an employee in your table much more easily by searching by name."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<SearchIcon sx={iconStyle} />}
                title={i18n.t("Search Data")}
            />
        ),
    },
    {
        target: ".button-group-employees",
        content: i18n.t(
            "From here you can edit, delete and see more details for each employee in the rows in the employees table."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<EngineeringIcon sx={iconStyle} />}
                title={i18n.t("Employee Operations")}
            />
        ),
    },
];

const AnimatedStyledEmployees = animated(StyledEmployees);

export default function Employees() {
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const animationProps = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: {
            duration: 800,
            easing: easings.easeInOutBack,
        },
        onRest: () => setIsAnimationEnd(true),
    });
    const { data, isLoading } = useGetEmployees();
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [runJoyride, setRunJoyride] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (localStorage.getItem("isEmployeesJoyrideDisplayed") === "true")
            return;
        else {
            localStorage.setItem("isEmployeesJoyrideDisplayed", "false");
            isAnimationEnd && setRunJoyride(true);
        }
    }, [isAnimationEnd]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, lifecycle } = data;
        if (
            lifecycle === "tooltip" ||
            lifecycle === "complete" ||
            lifecycle === "ready"
        ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        if (status === "finished") {
            localStorage.setItem("isEmployeesJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

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
                CustomToolbar={
                    <EmployeeToolBar
                        setSearchText={setSearchText}
                        searchText={searchText}
                        data={data}
                    />
                }
                data={data}
                searchText={searchText}
                selected={selected}
                setSelected={setSelected}
            />
            {data && data?.length > 0 && (
                <InformationContainer>
                    <CustomPieChart data={data} />
                    <EmployeeStats data={data} />
                </InformationContainer>
            )}
            <CustomJoyride
                pathname={runJoyride}
                callback={handleJoyrideCallback}
                steps={employeeSteps}
            />
        </AnimatedStyledEmployees>
    );
}
