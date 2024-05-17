import { Box } from "@mui/system";
import styled from "styled-components";
import SearchInput from "./SearchInput";
import { Backdrop, Button, Fade, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 50%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 2rem 3rem 2rem;
    border-radius: 5px;
    z-index: 300;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (max-width: 1250px) {
        width: 60%;
    }
`;

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
`;

function ResponsiveSearchInput({
    searchText,
    setSearchText,
    label,
    open,
    onCloseModal,
}: {
    searchText: string;
    setSearchText: any;
    label: string;
    open: boolean;
    onCloseModal: () => void;
}) {
    const { t } = useTranslation();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <StyledBox>
                    <span style={{ paddingLeft: "1rem" }}>{label}</span>
                    <SearchInput
                        searchText={searchText}
                        setSearchText={setSearchText}
                        label={label}
                    />
                    <StyledButtonContainer>
                        <Button
                            onClick={onCloseModal}
                            sx={{
                                backgroundColor: "var(--color-grey-800)",
                                color: "var(--color-grey-50)",
                                transition: "all .3s",
                                padding: "1rem 2rem",
                                fontSize: "1.1rem",
                                alignSelf: "flex-start",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-700)",
                                    transform: "translateY(-2px)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&.Mui-disabled": {
                                    background: "var(--color-grey-400)",
                                },
                            }}
                            variant="contained"
                        >
                            {t("Confirm")}
                        </Button>
                        <Button
                            onClick={() => {
                                onCloseModal();
                                setSearchText("");
                            }}
                            sx={{
                                color: "var(--color-grey-800)",
                                transition: "all .3s",
                                padding: "1rem 3rem",
                                fontSize: "1.1rem",
                                border: "1px solid var(--color-grey-500)",
                                backgroundColor: "var(--color-grey-100)",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "var(--color-grey-200)",
                                    transform: "translateY(-2px)",
                                    border: "1px solid var(--color-grey-800)",
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                                "&.Mui-disabled": {
                                    background: "var(--color-grey-400)",
                                },
                            }}
                            variant="outlined"
                        >
                            {t("Clear & Close")}
                        </Button>
                    </StyledButtonContainer>
                </StyledBox>
            </Fade>
        </Modal>
    );
}

export default ResponsiveSearchInput;
