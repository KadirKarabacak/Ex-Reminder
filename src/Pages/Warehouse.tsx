import { animated, easings, useSpring } from "react-spring";
import styled from "styled-components";
import { useGetWarehouse } from "../Api/warehouseController";
import CustomTable from "../Components/Table";
import { WarehouseToolBar } from "../Components/TableToolBars/WarehouseBar";
import { InfinitySpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../i18n";
import JoyrideTitle from "../Components/JoyrideTitle";
import { CallBackProps } from "react-joyride";
import CustomJoyride from "../Components/CustomJoyride";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useLocation } from "react-router-dom";

const StyledContact = styled.main`
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
        min-height: 70rem;
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

const warehouseSteps = [
    {
        target: ".addItem-btn",
        content: i18n.t(
            "Here you can add the items in your inventory to your warehouses table."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<AddBusinessIcon sx={iconStyle} />}
                title={i18n.t("Add Items")}
            />
        ),
    },
    {
        target: ".export-btn-warehouse",
        content: i18n.t(
            "Here you can print out all warehouse data in your table as PDF or Excel."
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
        target: ".search-input-warehouse",
        content: i18n.t(
            "From here, you can find an item in your table much more easily by searching by item name."
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
        target: ".button-group-warehouses",
        content: i18n.t(
            "From here you can edit, delete and see more details for each items in the rows in the warehouse table."
        ),
        placement: "bottom-end",
        title: (
            <JoyrideTitle
                icon={<WarehouseIcon sx={iconStyle} />}
                title={i18n.t("Warehouse Operations")}
            />
        ),
    },
];

const warehouseStepsPhone = [
    {
        target: ".warehouse-operations-menu",
        content: i18n.t(
            "From here you can print all warehouse data as PDF or Excel and add the items your company sells to your inventory."
        ),
        placement: "right-end",
        title: (
            <JoyrideTitle
                icon={<WarehouseIcon sx={iconStyle} />}
                title={i18n.t("Warehouse Operations")}
            />
        ),
    },
    {
        target: ".warehouse-search-modal",
        content: i18n.t(
            "From here you can search for a spesific item by item name."
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

const AnimatedStyledContact = animated(StyledContact);

export default function Warehouse() {
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
    const [searchText, setSearchText] = useState("");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [runJoyride, setRunJoyride] = useState(false);
    const { data, isLoading } = useGetWarehouse();
    const { pathname } = useLocation();

    useEffect(() => {
        if (localStorage.getItem("isWarehouseJoyrideDisplayed") === "true")
            return;
        else {
            localStorage.setItem("isWarehouseJoyrideDisplayed", "false");
            isAnimationEnd && setRunJoyride(true);
        }
    }, [isAnimationEnd]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, lifecycle } = data;
        if (
            lifecycle === "tooltip" ||
            lifecycle === "complete" ||
            lifecycle === "ready" ||
            pathname === "/warehouse"
        ) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
        if (status === "finished") {
            localStorage.setItem("isWarehouseJoyrideDisplayed", "true");
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
        <AnimatedStyledContact style={animationProps}>
            <Helmet>
                <title>Ex Reminder | {t("Warehouse")}</title>
            </Helmet>
            <CustomTable
                data={data}
                CustomToolbar={
                    <WarehouseToolBar
                        data={data}
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                }
                searchText={searchText}
                selected={selected}
                setSelected={setSelected}
            />
            <CustomJoyride
                pathname={runJoyride}
                callback={handleJoyrideCallback}
                steps={
                    window.innerWidth < 600
                        ? warehouseStepsPhone
                        : warehouseSteps
                }
            />
        </AnimatedStyledContact>
    );
}
