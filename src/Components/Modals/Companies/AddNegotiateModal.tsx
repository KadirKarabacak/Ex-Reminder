import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    FormControl,
    Grid,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { EditEmployeeModalTypes } from "../../../Interfaces/User";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import {
    useAddNegotiate,
    useGetCompanies,
} from "../../../Api/companyController";
import { auth } from "../../../Api/firebase";
import i18n from "../../../i18n";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 35%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem 4rem 3rem;
    border-radius: 5px;
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    & div + p {
        font-size: 1rem;
    }
    & label {
        color: var(--color-grey-400);
        font-size: 1.2rem;
    }
    & div > input {
        color: var(--color-grey-800);
        font-size: 1.3rem;

        &:disabled {
            background-color: var(--color-grey-300);
        }
    }
    & div > fieldset {
        border-color: var(--color-grey-500);
    }
    &:hover > div > fieldset {
        border-color: var(--color-brand-600) !important;
    }
`;

const StyledTitle = styled.h4`
    color: var(--color-grey-800);
    align-self: flex-start;
    margin-bottom: 0.9rem;
`;

const StyledDateTimePicker = styled(DateTimePicker)`
    width: 100%;

    & > div {
        color: var(--color-grey-800);
        font-size: 1.3rem;

        &:hover > fieldset {
            border-color: var(--color-brand-600) !important;
        }

        & > fieldset {
            border-color: var(--color-grey-500);
        }
    }
`;

const StyledSelect = styled(Select)`
    && {
        font-size: 1.3rem;
        color: var(--color-grey-800);

        & > fieldset {
            border-color: var(--color-grey-500);
        }

        &:hover > fieldset {
            border-color: var(--color-brand-600) !important;
        }

        &:disabled {
            background-color: transparent !important;
            cursor: not-allowed;
        }
    }
`;

const StyledMenuItem = styled(MenuItem)`
    border-bottom: 1px solid #efefef !important;
    background-color: transparent !important;
`;

const alarms = [
    { label: i18n.t("Yes, alert me"), value: 1 },
    { label: i18n.t("No, don't warn me."), value: 0 },
];

const warningTimes = [
    { label: i18n.t("1 hour"), value: 1 },
    { label: i18n.t("2 hour"), value: 2 },
    { label: i18n.t("3 hour"), value: 3 },
    { label: i18n.t("4 hour"), value: 4 },
    { label: i18n.t("5 hour"), value: 5 },
    { label: i18n.t("6 hour"), value: 6 },
    { label: i18n.t("7 hour"), value: 7 },
    { label: i18n.t("8 hour"), value: 8 },
    { label: i18n.t("9 hour"), value: 9 },
    { label: i18n.t("10 hour"), value: 10 },
    { label: i18n.t("11 hour"), value: 11 },
    { label: i18n.t("12 hour"), value: 12 },
];

export default function AddNegotiateModal({
    open,
    handleClose,
    row,
    id,
}: EditEmployeeModalTypes) {
    const { handleSubmit, register, getValues, clearErrors, reset } = useForm();
    const { t } = useTranslation();
    const [dateAndTime, setDateAndTime] = useState(new Date());
    const [alarm, setAlarm] = useState(1);
    const [alarmWarningTime, setAlarmWarningTime] = useState(1);
    const { mutateAsync: addNegotiate } = useAddNegotiate();
    const [selectedCompany, setSelectedCompany] = useState("");
    const { data: companies } = useGetCompanies();
    const { currentUser } = auth;
    const userId = currentUser?.uid;
    const findCompany = companies?.find(
        company => company.id === selectedCompany
    );

    async function onSubmit() {
        const { negotiateContent } = getValues();

        const negotiate = {
            companyName: findCompany?.companyName,
            companyId: findCompany?.id,
            negotiateContent,
            negotiateDateAndTime: dateAndTime,
            negotiateAlarm: alarm ? true : false,
            negotiateAlarmWarningTime: alarmWarningTime,
            isAlarmDismissed: false,
        };

        await addNegotiate({ userId, negotiate });
        onCloseModal();
    }

    function handleChangeDateAndTime(value: any) {
        setDateAndTime(value);
    }

    function onCloseModal() {
        handleClose(open);
        clearErrors();
        reset();
    }

    useEffect(() => {
        setSelectedCompany(row.id);
    }, [row?.id]);

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <StyledBox>
                        <Typography
                            id="transition-modal-title"
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: "bold",
                                letterSpacing: "0.80px",
                            }}
                        >
                            {t("Add Negotiate")}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: "1rem" }}>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Company Name*")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        required
                                        displayEmpty
                                        disabled
                                        labelId="selectedCompanyLabel"
                                        id="selectedCompany"
                                        value={selectedCompany}
                                        onChange={e =>
                                            setSelectedCompany(
                                                e.target.value as string
                                            )
                                        }
                                    >
                                        <StyledMenuItem
                                            sx={{
                                                backgroundColor:
                                                    "transparent!important",
                                            }}
                                            disabled
                                            disableRipple
                                            value=""
                                        >
                                            {t("Select Company")}
                                        </StyledMenuItem>
                                        {companies &&
                                            companies.map((company, i) => (
                                                <StyledMenuItem
                                                    disableRipple
                                                    key={i}
                                                    value={company.id}
                                                >
                                                    {company.companyName}
                                                </StyledMenuItem>
                                            ))}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>
                                    {t("Negotiate Date & Time")}
                                </StyledTitle>
                                <StyledDateTimePicker
                                    views={[
                                        "year",
                                        "month",
                                        "day",
                                        "hours",
                                        "minutes",
                                    ]}
                                    value={dateAndTime}
                                    onChange={e => handleChangeDateAndTime(e)}
                                    closeOnSelect={false}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider
                                    sx={{
                                        borderColor: "var(--color-grey-200)",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <StyledTitle>{t("Alarm")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        required
                                        displayEmpty
                                        labelId="selectedAlarmLabel"
                                        id="selectedAlarm"
                                        value={alarm}
                                        onChange={e =>
                                            setAlarm(e.target.value as number)
                                        }
                                    >
                                        <StyledMenuItem
                                            sx={{
                                                backgroundColor:
                                                    "transparent!important",
                                            }}
                                            disabled
                                            disableRipple
                                            value=""
                                        >
                                            {t("Alarm type")}
                                        </StyledMenuItem>
                                        {alarms.map((alarm, index) => {
                                            return (
                                                <StyledMenuItem
                                                    key={index}
                                                    sx={{
                                                        backgroundColor:
                                                            "transparent!important",
                                                    }}
                                                    disableRipple
                                                    value={alarm.value}
                                                >
                                                    {alarm.label}
                                                </StyledMenuItem>
                                            );
                                        })}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledTitle>{t("Alarm")}</StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        required
                                        displayEmpty
                                        labelId="selectedAlarmLabel"
                                        id="selectedAlarm"
                                        value={alarmWarningTime}
                                        onChange={e =>
                                            setAlarmWarningTime(
                                                e.target.value as number
                                            )
                                        }
                                    >
                                        <StyledMenuItem
                                            sx={{
                                                backgroundColor:
                                                    "transparent!important",
                                            }}
                                            disabled
                                            disableRipple
                                            value=""
                                        >
                                            {t("Alarm warning time")}
                                        </StyledMenuItem>
                                        {warningTimes.map((warning, index) => {
                                            return (
                                                <StyledMenuItem
                                                    key={index}
                                                    sx={{
                                                        backgroundColor:
                                                            "transparent!important",
                                                    }}
                                                    disableRipple
                                                    value={warning.value}
                                                >
                                                    {warning.label}
                                                </StyledMenuItem>
                                            );
                                        })}
                                    </StyledSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider
                                    sx={{
                                        borderColor: "var(--color-grey-200)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTitle>
                                    {t("Negotiate Content")}
                                </StyledTitle>
                                <StyledTextField
                                    // disabled={isPending}
                                    placeholder={t("Negotiate Content")}
                                    {...register("negotiateContent")}
                                />
                            </Grid>
                        </Grid>

                        <StyledButtonContainer>
                            <Button
                                // disabled={isPending}
                                sx={{
                                    backgroundColor: "var(--color-grey-800)",
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1rem 2rem",
                                    fontSize: "1.1rem",
                                    alignSelf: "flex-start",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-700)",
                                        transform: "translateY(-2px)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                {t("Add Negotiate")}
                            </Button>
                            <Button
                                // disabled={isPending}
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-800)",
                                    transition: "all .3s",
                                    padding: "1rem 3rem",
                                    fontSize: "1.1rem",
                                    border: "1px solid var(--color-grey-500)",
                                    backgroundColor: "var(--color-grey-100)",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-grey-200)",
                                        transform: "translateY(-2px)",
                                        border: "1px solid var(--color-grey-800)",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                variant="outlined"
                            >
                                {t("Cancel")}
                            </Button>
                        </StyledButtonContainer>
                    </StyledBox>
                </form>
            </Fade>
        </Modal>
    );
}
