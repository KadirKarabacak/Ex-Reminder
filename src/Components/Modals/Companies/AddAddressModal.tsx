import {
    Autocomplete,
    Backdrop,
    Box,
    Button,
    Fade,
    Grid,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Map from "../../Map/Map";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCities } from "../../../Api/mapController";
import { reverseGeocode } from "../../../Utils/utils";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 50%;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem 4rem 3rem;
    border-radius: 5px;
    z-index: 300;
`;
const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 3rem;
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

const StyledAutoComplate = styled(Autocomplete)`
    & > div > div {
        color: var(--color-grey-800);
        font-size: 1.3rem;
    }

    & > div > label {
        color: var(--color-grey-400);
        font-size: 1.2rem;
    }

    & > div > div > fieldset {
        border-color: var(--color-grey-500) !important;
    }
`;

const StyledTitle = styled.h3`
    color: var(--color-green-lighter);
    align-self: flex-start;
    margin-bottom: 0.3rem;
    font-weight: 300;
    font-size: 1.2rem;
`;

export default function AddAddressModal({
    open,
    handleClose,
    setAddressData,
}: {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    setAddressData: React.Dispatch<React.SetStateAction<any>>;
}) {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const { data, isLoading } = useGetCities();
    const { handleSubmit, register, clearErrors, reset } = useForm();
    const [province, setProvince] = useState<any>(null);
    const [district, setDistrict] = useState<any>(null);
    const [neighbourhood, setNeighbourhood] = useState<any>("");
    const [clickedPosition, setClickedPosition] = useState<any>(null);
    const [findAddress, setFindAddress] = useState<any>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const isAddressModal = pathname.includes("/companies");

    const provinceOptions = !isLoading
        ? data.data
              .map((city: any) => {
                  const cityName =
                      city.name.charAt(0).toUpperCase() === "İ"
                          ? "I" + city.name.slice(1)
                          : city.name;
                  return cityName;
              })
              .sort()
        : [];

    const selectedProvinceCoords = province
        ? data?.data?.find((city: any) => {
              const cityName =
                  city.name.charAt(0).toUpperCase() === "İ"
                      ? "I" + city.name.slice(1)
                      : city.name;
              return cityName === province;
          })?.coordinates
        : null;

    const districtOptions = !isLoading
        ? data.data
              .find((city: any) => city.name === searchParams.get("province"))
              ?.districts.map((district: any) => district.name)
        : [];

    async function onSubmit(data: FieldValues) {
        setAddressData({
            ...data,
            province,
            district,
            neighbourhood,
            companyCoordinates: {
                lat: selectedProvinceCoords.latitude,
                lng: selectedProvinceCoords.longitude,
            },
        });
        onCloseModal();
    }

    function onCloseModal() {
        handleClose(open);
        clearErrors();
        reset();
        searchParams.delete("action");
        setTimeout(() => {
            setSearchParams(searchParams);
        }, 400);
    }

    //! Handle Field Changes
    function handleChangeProvince(e: any) {
        setProvince(e.target.outerText);
        searchParams.set("province", e.target.outerText);
        searchParams.delete("district");
        setSearchParams(searchParams);
        setDistrict(null);
        setNeighbourhood("");
        setClickedPosition(null);
    }

    function handleChangeDistrict(e: any) {
        setDistrict(e.target.outerText);
        searchParams.set("district", e.target.outerText);
        setNeighbourhood("");
        setSearchParams(searchParams);
    }

    function handleChangeNeighbourhood(e: any) {
        setNeighbourhood(e.target.outerText);
        searchParams.set("neighbourhood", e.target.outerText);
        setSearchParams(searchParams);
    }

    //! Get Address by Map Click
    useEffect(() => {
        async function getAddressInfo() {
            if (clickedPosition)
                setFindAddress(
                    await reverseGeocode(
                        clickedPosition.lat,
                        clickedPosition.lng
                    )
                );
        }
        getAddressInfo();
    }, [clickedPosition]);

    //! AutoFill inputs by clicked address
    useEffect(() => {
        if (findAddress) {
            setProvince(findAddress.province || null);
            setDistrict(findAddress.town || null);
            setNeighbourhood(findAddress.suburb || "");
            searchParams.set("province", findAddress.province || "");
            searchParams.set("district", findAddress.town || "");
            searchParams.set("neighbourhood", findAddress.suburb || "");
            setSearchParams(searchParams);
        }
    }, [findAddress]);

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
                                mb: "3rem",
                            }}
                        >
                            {t("Add Address")}
                        </Typography>
                        <Grid container spacing={3} sx={{ mb: "2rem" }}>
                            <Grid item xs={12} md={4} xl={3}>
                                <Grid container sx={{ height: "100%" }}>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <StyledTitle>
                                            {t("Province")}
                                        </StyledTitle>
                                        <StyledAutoComplate
                                            id="controllable-states-demo"
                                            disableClearable
                                            options={provinceOptions}
                                            value={province}
                                            onChange={(e: any) =>
                                                handleChangeProvince(e)
                                            }
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label={t("Province")}
                                                    variant="filled"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <StyledTitle>
                                            {t("District")}
                                        </StyledTitle>
                                        <StyledAutoComplate
                                            options={districtOptions || []}
                                            disableClearable
                                            value={district}
                                            onChange={(e: any) =>
                                                handleChangeDistrict(e)
                                            }
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label={t("District")}
                                                    variant="filled"
                                                    required
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <StyledTitle>
                                            {t("Neighbourhood")}
                                        </StyledTitle>
                                        <StyledTextField
                                            label={t("Neighbourhood")}
                                            value={neighbourhood}
                                            variant="filled"
                                            onChange={e =>
                                                handleChangeNeighbourhood(e)
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <StyledTitle>{t("Street")}</StyledTitle>
                                        <StyledTextField
                                            variant="filled"
                                            label={t("Street")}
                                            {...register("street")}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <StyledTitle>
                                            {t("Door Number")}
                                        </StyledTitle>
                                        <StyledTextField
                                            variant="filled"
                                            label={t("Door Number")}
                                            {...register("doorNumber")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={8} xl={9}>
                                <Paper
                                    elevation={6}
                                    sx={{
                                        minHeight: "16rem",
                                        overflow: "hidden",
                                        backgroundColor: "var(--color-grey-50)",
                                        height: "42rem",
                                    }}
                                >
                                    <Map
                                        isAddressModal={isAddressModal}
                                        selectedProvinceCoords={
                                            selectedProvinceCoords
                                        }
                                        setClickedPosition={setClickedPosition}
                                        clickedPosition={clickedPosition}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <StyledButtonContainer>
                            <Button
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
                                {t("Complate Address")}
                            </Button>
                            <Button
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
