import { InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { generateSearchInputClassName } from "../Utils/utils";

const Search = styled("div")(({ theme }) => ({
    height: "4.4rem",
    display: "flex",
    border: "1px solid var(--color-grey-500)",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    color: "var(--color-grey-800)",
    borderColor: "var(--color-grey-500)",
    "&:hover": {
        backgroundColor: "transparent",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    fontSize: "1.4rem",
    "& .MuiInputBase-input": {
        padding: "1rem 2rem",
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        "@media (min-width: 650px)": {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
        // [theme.breakpoints.up("sm")]: {
        //     width: "12ch",
        //     "&:focus": {
        //         width: "20ch",
        //     },
        // },
    },
}));

export default function SearchInput({
    searchText,
    setSearchText,
    label,
}: {
    searchText: string;
    setSearchText: any;
    label: string;
}) {
    const { pathname } = useLocation();

    return (
        <Search className={generateSearchInputClassName(pathname)}>
            <SearchIconWrapper>
                <SearchIcon sx={{ fontSize: "2rem" }} />
            </SearchIconWrapper>
            <StyledInputBase
                id={generateSearchInputClassName(pathname)}
                value={searchText}
                onChange={e => {
                    setSearchText(e.target.value);
                }}
                placeholder={label}
                inputProps={{ "aria-label": "search" }}
            />
        </Search>
    );
}
