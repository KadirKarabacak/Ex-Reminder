import styled from "styled-components";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDarkMode } from "../Contexts/DarkModeContext";
import { Button, Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";
import { logOut } from "../Api/userController";
import { auth } from "../Api/firebase";

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
    align-items: center;
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 1rem;

    &:not(:first-child) {
        border: 1px solid var(--color-grey-200);
        border-radius: 3px;
    }
`;

const StyledUserInfo = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
`;

const StyledAvatar = styled.img`
    width: 4rem;
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-800);
    transition: all 0.3s;

    &:hover {
        opacity: 0.9;
        outline: 2px solid transparent;
        scale: 1.1;
        border-radius: 3px;
    }
`;

const StyledName = styled.span`
    color: var(--color-grey-800);
`;

const iconStyle = {
    width: "2rem",
    height: "2rem",
    color: "var(--color-grey-600)",
    transition: "all .3s",
    ":hover": {
        color: "var(--color-brand-500)",
    },
};

const StyledButton = styled(Button)`
    &:hover > svg {
        color: var(--color-brand-500);
    }
`;

function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { currentUser } = auth;

    return (
        <StyledHeader>
            <StyledList>
                <StyledUserInfo>
                    <StyledListItem>
                        {currentUser?.photoURL && (
                            <StyledAvatar
                                src={currentUser.photoURL}
                                alt="User Avatar"
                            />
                        )}
                        {!currentUser?.photoURL && (
                            <StyledAvatar
                                src="../../placeholder-avatar.png"
                                alt="Placeholder Avatar"
                            />
                        )}
                        <StyledName>
                            {currentUser?.displayName
                                ? currentUser.displayName
                                : "User"}
                        </StyledName>
                    </StyledListItem>
                </StyledUserInfo>
                <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                    sx={{ borderColor: "var(--color-grey-300)" }}
                />
                <StyledListItem>
                    <Tooltip TransitionComponent={Zoom} title="Notifications">
                        <StyledButton
                            sx={{
                                fontSize: "2rem",
                                minWidth: 0,
                                p: "0.7rem",
                            }}
                            color="inherit"
                            variant="text"
                        >
                            <NotificationsIcon sx={iconStyle} />
                        </StyledButton>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip TransitionComponent={Zoom} title="Toggle Darkmode">
                        <StyledButton
                            sx={{
                                fontSize: "2rem",
                                minWidth: 0,
                                p: "0.7rem",
                            }}
                            onClick={() => toggleDarkMode()}
                            color="inherit"
                            variant="text"
                        >
                            {isDarkMode ? (
                                <LightModeIcon sx={iconStyle} />
                            ) : (
                                <DarkModeIcon sx={iconStyle} />
                            )}
                        </StyledButton>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip TransitionComponent={Zoom} title="Logout">
                        <StyledButton
                            sx={{
                                fontSize: "2rem",
                                minWidth: 0,
                                p: "0.7rem",
                                lineHeight: 0,
                            }}
                            color="inherit"
                            variant="text"
                        >
                            <Link onClick={() => logOut()} to="/login">
                                <LogoutIcon sx={iconStyle} />
                            </Link>
                        </StyledButton>
                    </Tooltip>
                </StyledListItem>
            </StyledList>
        </StyledHeader>
    );
}

export default Header;
