import styled from "styled-components";
import { animated, easings, useSpring } from "react-spring";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import CustomTable from "../Components/Table";
import { CompaniesToolBar } from "../Components/TableToolBars/CompaniesBar";
import { useGetCompanies } from "../Api/companyController";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";
import AnimatedPage from "../Components/AnimatedPage";
import { useEffect, useState } from "react";
import i18n from "../i18n";
import JoyrideTitle from "../Components/JoyrideTitle";
import { CallBackProps } from "react-joyride";
import CustomJoyride from "../Components/CustomJoyride";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CompanyOperations from "./CompanyOperations";
import BusinessIcon from "@mui/icons-material/Business";

const StyledCompany = styled.main`
    width: 100%;
    min-height: 60rem;
    background-color: var(--color-grey-100);
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 2rem 2rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);

    @media (max-width: 1000px) {
        border-radius: 0;
        padding: 1rem;
    }
    @media (max-width: 600px) {
        height: calc(100dvh - 7rem);
    }
`;

const FullPage = styled.div`
    height: 65rem;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-300)",
    transition: "all .3s",
};

const companiesSteps = [
    {
        target: ".makeSaleFromCompany-btn",
        content: i18n.t(
            "Here you can create a sales record for a company in your table. Sales records are recorded both in the operations section of the company and in the accounting section of your application."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<PostAddIcon sx={iconStyle} />}
                title={i18n.t("Make Sales")}
            />
        ),
    },
    {
        target: ".addCompany-btn",
        content: i18n.t(
            "Here you can add and list the companies you do business with in your companies table."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<DomainAddIcon sx={iconStyle} />}
                title={i18n.t("Add Companies")}
            />
        ),
    },
    {
        target: ".export-btn-companies",
        content: i18n.t(
            "Here you can print out all companies data in your table as PDF or Excel."
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
        target: ".search-input-companies",
        content: i18n.t(
            "From here, you can find a company in your table much more easily by searching by company name."
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
        target: ".button-group-companies",
        content: i18n.t(
            "From here, you can edit, delete, add agreements, negotiations and sales to your companies. You can also browse the operations section for more details about agreements, sales and the company."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<SettingsApplicationsIcon sx={iconStyle} />}
                title={i18n.t("Company Operations")}
            />
        ),
    },
];

const companiesStepsPhone = [
    {
        target: ".company-operations-menu",
        content: i18n.t(
            "From here you can create a sales record for a company, can print out all companies as PDF or Excel, can add and list the companies you do business with in the table."
        ),
        placement: "right-end",
        title: (
            <JoyrideTitle
                icon={<BusinessIcon sx={iconStyle} />}
                title={i18n.t("Company Operations")}
            />
        ),
    },
    {
        target: ".company-search-modal",
        content: i18n.t(
            "From here you can search for a spesific company by company name."
        ),
        placement: "right-end",
        title: (
            <JoyrideTitle
                icon={<SearchIcon sx={iconStyle} />}
                title={i18n.t("Search Data")}
            />
        ),
    },
];

const AnimatedStyledCompany = animated(StyledCompany);

export default function Companies() {
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
    const { t } = useTranslation();
    const { data, isLoading } = useGetCompanies();
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [runJoyride, setRunJoyride] = useState(false);
    const params = useParams();
    const { companyId } = params;
    const currentCompany =
        companyId && data?.find(comp => comp.id === companyId);
    const { pathname } = useLocation();

    useEffect(() => {
        if (localStorage.getItem("isCompaniesJoyrideDisplayed") === "true")
            return;
        else {
            localStorage.setItem("isCompaniesJoyrideDisplayed", "false");
            isAnimationEnd && setRunJoyride(true);
        }
    }, [isAnimationEnd]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, lifecycle } = data;
        if (
            lifecycle === "tooltip" ||
            lifecycle === "complete" ||
            lifecycle === "ready" ||
            pathname === "/companies"
        ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        if (status === "finished") {
            localStorage.setItem("isCompaniesJoyrideDisplayed", "true");
            setRunJoyride(false);
        }
    };

    if (isLoading)
        return (
            <FullPage>
                <InfinitySpin color="var(--color-grey-800)" />
            </FullPage>
        );

    if (companyId) return <CompanyOperations currentCompany={currentCompany} />;

    if (!companyId)
        return (
            <AnimatedStyledCompany style={animationProps}>
                <Helmet>
                    <title>Ex Reminder | {t("Companies")}</title>
                </Helmet>
                <AnimatedPage>
                    <CustomTable
                        CustomToolbar={
                            <CompaniesToolBar
                                data={data}
                                searchText={searchText}
                                setSearchText={setSearchText}
                            />
                        }
                        data={data}
                        searchText={searchText}
                        setSelected={setSelected}
                        selected={selected}
                    />
                </AnimatedPage>
                <CustomJoyride
                    pathname={runJoyride}
                    callback={handleJoyrideCallback}
                    steps={
                        window.innerWidth < 600
                            ? companiesStepsPhone
                            : companiesSteps
                    }
                />
            </AnimatedStyledCompany>
        );
}
