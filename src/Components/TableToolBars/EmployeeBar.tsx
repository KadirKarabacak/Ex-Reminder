import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddEmployeeModal from "../Modals/Employees/AddEmployeeModal";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import ExportButton from "../ExportButton";
import { Employee } from "../../Interfaces/User";
import { formatCurrency, formatTimestampToDate } from "../../Utils/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import ResponsiveSearchInput from "../ResponsiveSearchInput";

const StyledToolBar = styled(Toolbar)`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const StyledSmallContainer = styled.div`
    display: none;
    @media (max-width: 1100px) {
        display: block;
    }
`;

const StyledLargeContainer = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: 1100px) {
        display: none;
    }
`;

const StyledSmallSearchContainer = styled.div`
    display: none;
    @media (max-width: 1100px) {
        display: block;
    }
`;

const StyledLargeSearchContainer = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: 1100px) {
        display: none;
    }
`;

const iconStyle = {
    width: "2.5rem",
    height: "2.5rem",
    transition: "all .3s",
};

export function EmployeeToolBar({
    searchText,
    setSearchText,
    data,
}: {
    searchText: any;
    setSearchText: any;
    data: any;
}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchParams, setSearchParams] = useSearchParams();
    // TODO:
    const [openSearchInput, setOpenSearchInput] = useState(false);

    const handleOpenSearchInput = () => {
        setOpenSearchInput(true);
        setSearchParams("search-employees");
    };
    const handleCloseSearchInput = () => {
        setOpenSearchInput(false);
        setTimeout(() => {
            setSearchParams(``);
        }, 400);
    };

    // TODO:
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const opensMenu = Boolean(anchorEl);
    const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const ExcelData = data.map((value: Employee) => {
        return {
            full_name: value?.full_name || t("-"),
            job_title: value?.job_title || t("-"),
            department: value?.department || t("-"),
            salary: formatCurrency(value?.salary),
            hire_date: formatTimestampToDate(value?.hire_date) || t("-"),
            age: value?.age || t("-"),
            email: value?.email || t("-"),
        };
    });

    const PdfBody = data.map((value: Employee) => {
        return [
            value?.full_name || t("-"),
            value?.job_title || t("-"),
            value?.department || t("-"),
            formatCurrency(value?.salary),
            formatTimestampToDate(value?.hire_date) || t("-"),
            value?.age || t("-"),
            value?.email || t("-"),
        ];
    });

    return (
        <>
            <StyledToolBar
                sx={{
                    pl: { sm: 3 },
                    pr: { xs: 1, sm: 2 },
                    gap: "1.5rem",
                }}
            >
                <Typography
                    sx={{
                        marginRight: "auto",
                        color: "var(--color-green-lighter)",
                        fontSize: "2.4rem",
                        fontWeight: "bold",
                        borderBottom: "3px solid var(--color-green-lighter)",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {t("Employees")}
                </Typography>
                <StyledLargeSearchContainer>
                    <SearchInput
                        searchText={searchText}
                        setSearchText={setSearchText}
                        label={t("Search Employee by Name")}
                    />
                </StyledLargeSearchContainer>
                <StyledSmallSearchContainer>
                    <IconButton
                        className="employees-search-modal"
                        onClick={handleOpenSearchInput}
                        size="large"
                        aria-label="search"
                        color="inherit"
                    >
                        <SearchIcon sx={iconStyle} />
                    </IconButton>
                </StyledSmallSearchContainer>
                <StyledSmallContainer>
                    <Button
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            alignSelf: "center",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                            },
                            "&:disabled": {
                                backgroundColor: "var(--color-grey-500)",
                            },
                            "& > span > svg": { fill: "var(--color-grey-50)" },
                        }}
                        id="demo-customized-button"
                        aria-controls={
                            opensMenu ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={opensMenu ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClickMenuItem}
                        endIcon={<KeyboardArrowDownIcon />}
                        className="employee-operations-menu"
                    >
                        {t("Operations")}
                    </Button>
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={opensMenu}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem disableRipple>
                            <ExportButton
                                isInSmallContainer={true}
                                title={t("Employees")}
                                excel={{
                                    headers: [
                                        {
                                            label: t("Full Name"),
                                            key: "full_name",
                                        },
                                        {
                                            label: t("Job Title"),
                                            key: "job_title",
                                        },
                                        {
                                            label: t("Department"),
                                            key: "department",
                                        },
                                        {
                                            label: t("Salary"),
                                            key: "salary",
                                        },
                                        {
                                            label: t("Hire Date"),
                                            key: "hire_date",
                                        },
                                        {
                                            label: t("Age"),
                                            key: "age",
                                        },
                                        {
                                            label: t("Email"),
                                            key: "email",
                                        },
                                    ],
                                    data: ExcelData,
                                }}
                                pdf={{
                                    head: [
                                        [
                                            t("Full Name"),
                                            t("Job Title"),
                                            t("Department"),
                                            t("Salary"),
                                            t("Hire Date"),
                                            t("Age"),
                                            t("Email"),
                                        ],
                                    ],
                                    body: PdfBody,
                                }}
                            />
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu} disableRipple>
                            <Button
                                className="addEmployee-btn"
                                onClick={handleOpen}
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "center",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-600)",
                                        color: "var(--color-grey-100)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                    "&:disabled": {
                                        backgroundColor:
                                            "var(--color-grey-500)",
                                    },
                                }}
                                variant="contained"
                            >
                                {t("Add Employee")}
                            </Button>
                        </MenuItem>
                    </Menu>
                </StyledSmallContainer>
                <StyledLargeContainer>
                    <ExportButton
                        title={t("Employees")}
                        excel={{
                            headers: [
                                {
                                    label: t("Full Name"),
                                    key: "full_name",
                                },
                                {
                                    label: t("Job Title"),
                                    key: "job_title",
                                },
                                {
                                    label: t("Department"),
                                    key: "department",
                                },
                                {
                                    label: t("Salary"),
                                    key: "salary",
                                },
                                {
                                    label: t("Hire Date"),
                                    key: "hire_date",
                                },
                                {
                                    label: t("Age"),
                                    key: "age",
                                },
                                {
                                    label: t("Email"),
                                    key: "email",
                                },
                            ],
                            data: ExcelData,
                        }}
                        pdf={{
                            head: [
                                [
                                    t("Full Name"),
                                    t("Job Title"),
                                    t("Department"),
                                    t("Salary"),
                                    t("Hire Date"),
                                    t("Age"),
                                    t("Email"),
                                ],
                            ],
                            body: PdfBody,
                        }}
                    />
                    <Button
                        className="addEmployee-btn"
                        onClick={handleOpen}
                        sx={{
                            backgroundColor: "var(--color-grey-800)",
                            color: "var(--color-grey-50)",
                            transition: "all .3s",
                            padding: "1rem 2rem",
                            "@media (max-width: 1100px)": {
                                padding: "1rem 1.1rem",
                            },
                            fontSize: "1.1rem",
                            alignSelf: "center",
                            "&:hover": {
                                backgroundColor: "var(--color-grey-600)",
                                color: "var(--color-grey-100)",
                                transform: "translateY(-2px)",
                            },
                            "&:active": {
                                transform: "translateY(0)",
                            },
                            "&:disabled": {
                                backgroundColor: "var(--color-grey-500)",
                            },
                        }}
                        variant="contained"
                    >
                        {t("Add Employee")}
                    </Button>
                </StyledLargeContainer>
            </StyledToolBar>
            <AddEmployeeModal handleClose={handleClose} open={open} />
            {searchParams.has("search-employees") && (
                <ResponsiveSearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    label={t("Search Employee by Name")}
                    onCloseModal={handleCloseSearchInput}
                    open={openSearchInput}
                />
            )}
        </>
    );
}
