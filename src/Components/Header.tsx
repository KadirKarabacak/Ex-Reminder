import styled from "styled-components";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDarkMode } from "../Contexts/DarkModeContext";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 3rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
`;

const StyledList = styled.ul`
    display: flex;
    gap: 1.2rem;
    list-style: none;
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-600)",
};

function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <StyledHeader>
            <StyledList>
                <StyledListItem>User</StyledListItem>
                <StyledListItem>
                    <Button
                        sx={{ fontSize: "2rem", minWidth: 0, p: "0.7rem" }}
                        onClick={() => toggleDarkMode()}
                        color="inherit"
                        variant="text"
                    >
                        <Tooltip
                            TransitionComponent={Zoom}
                            title="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <LightModeIcon sx={iconStyle} />
                            ) : (
                                <DarkModeIcon sx={iconStyle} />
                            )}
                        </Tooltip>
                    </Button>
                </StyledListItem>
                <StyledListItem>
                    <Button
                        sx={{ fontSize: "2rem", minWidth: 0, p: "0.7rem" }}
                        color="inherit"
                        variant="text"
                    >
                        <Tooltip TransitionComponent={Zoom} title="Logout">
                            <LogoutIcon sx={iconStyle} />
                        </Tooltip>
                    </Button>
                </StyledListItem>
            </StyledList>
        </StyledHeader>
    );
}

export default Header;
