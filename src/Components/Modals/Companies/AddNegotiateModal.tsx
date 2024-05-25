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
import {
    EditEmployeeModalTypes,
    NegotiateTypes,
} from "../../../Interfaces/User";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useGetCompanies } from "../../../Api/companyController";
import { useAddNegotiate } from "../../../Api/negotiateController";
import { auth } from "../../../Api/firebase";
import i18n from "../../../i18n";
import { add } from "date-fns";
import { formatDateAndTime } from "../../../Utils/utils";

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

    @media (max-width: 1000px) {
        width: 80%;
    }
    @media (max-width: 650px) {
        width: 95%;
        padding: 3rem 2rem;
    }
    @media (max-width: 450px) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0;
        gap: 0.3rem;
    }
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

        & > .Mui-disabled {
            background: var(--color-grey-200);
            color: var(--color-grey-600);
            -webkit-text-fill-color: var(--color-grey-500);
            cursor: not-allowed;
        }
    }
`;

const StyledMenuItem = styled(MenuItem)`
    border-bottom: 1px solid #efefef !important;
    background-color: transparent !important;
`;

export default function AddNegotiateModal({
    open,
    handleClose,
    row,
}: EditEmployeeModalTypes) {
    const { handleSubmit, clearErrors, reset } = useForm();
    const { t } = useTranslation();
    const [dateAndTime, setDateAndTime] = useState(
        add(new Date(), { hours: 1 })
    );
    const [alarm, setAlarm] = useState(1);
    const [alarmWarningTime, setAlarmWarningTime] = useState(1);
    const { mutateAsync: addNegotiate, isPending } = useAddNegotiate();
    const [selectedCompany, setSelectedCompany] = useState("");
    const [negotiateDescription, setNegotiateDescription] = useState("");
    const { data: companies } = useGetCompanies();
    const { currentUser } = auth;
    const currentLanguage = i18n.language;
    const userId = currentUser?.uid;
    const findCompany = companies?.find(
        company => company.id === selectedCompany
    );

    const alarms = [
        { label: t("Yes, alert me"), value: 1 },
        { label: t("No, don't warn me"), value: 0 },
    ];

    const warningTimes = [
        //! Handle this option
        // { label: t("When the time comes"), value: 0 },
        { label: t("1 hour left"), value: 1 },
        { label: t("2 hour left"), value: 2 },
        { label: t("3 hour left"), value: 3 },
        { label: t("4 hour left"), value: 4 },
        { label: t("5 hour left"), value: 5 },
        { label: t("6 hour left"), value: 6 },
        { label: t("7 hour left"), value: 7 },
        { label: t("8 hour left"), value: 8 },
        { label: t("9 hour left"), value: 9 },
        { label: t("10 hour left"), value: 10 },
        { label: t("11 hour left"), value: 11 },
        { label: t("12 hour left"), value: 12 },
    ];

    async function onSubmit() {
        const negotiate: NegotiateTypes = {
            companyName: findCompany?.companyName,
            companyId: findCompany?.id,
            negotiateContent: negotiateDescription,
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

    const updateNegotiateContent = () => {
        const newNegotiateDescription =
            currentLanguage === "en-EN"
                ? t(
                      `We have a negotiate with ${
                          row.companyName
                      } on ${formatDateAndTime(dateAndTime)}`
                  )
                : `${row.companyName} isimli şirket ile ${formatDateAndTime(
                      dateAndTime
                  )} tarihinde görüşmemiz var`;
        setNegotiateDescription(newNegotiateDescription);
    };

    useEffect(() => {
        setSelectedCompany(row.id);
    }, [row?.id]);

    useEffect(() => {
        updateNegotiateContent();
    }, [row.companyName, dateAndTime]);

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
                                    {window.innerWidth < 600
                                        ? t("Date & Time")
                                        : t("Negotiate Date & Time")}
                                </StyledTitle>
                                <StyledDateTimePicker
                                    disabled={isPending}
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
                                        disabled={isPending}
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
                                <StyledTitle>
                                    {window.innerWidth < 600
                                        ? t("Warning Time")
                                        : t("Alarm warning time")}
                                </StyledTitle>
                                <FormControl sx={{ width: "100%" }}>
                                    <StyledSelect
                                        required
                                        displayEmpty
                                        disabled={isPending}
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
                                    disabled={isPending}
                                    placeholder={t("Negotiate Content")}
                                    value={negotiateDescription}
                                    onChange={e =>
                                        setNegotiateDescription(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>

                        <StyledButtonContainer>
                            <Button
                                disabled={isPending}
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
                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
                                    },
                                }}
                                type="submit"
                                variant="contained"
                            >
                                {t("Add Negotiate")}
                            </Button>
                            <Button
                                disabled={isPending}
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
                                    "&.Mui-disabled": {
                                        background: "var(--color-grey-400)",
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
