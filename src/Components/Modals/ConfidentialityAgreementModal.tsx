import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ModalTypes } from "../../Interfaces/User";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 35%;
    max-height: 75rem;
    background-color: var(--color-grey-100);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 4rem 4rem 3rem;
    border-radius: 5px;
    overflow-y: scroll;
    width: 65%;
`;

const StyledSpan = styled.span`
    font-weight: bold;
    color: var(--color-brand-500);
    display: block;
    margin-bottom: 1rem;
    font-size: 2rem;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 65rem;
`;

const TypographyStyle = {
    marginBottom: "2rem",
};

export default function ConfidentialityAgreementModal({
    handleClose,
    open,
}: ModalTypes) {
    const { t } = useTranslation();

    function onCloseModal() {
        handleClose(open);
    }

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
                    <StyledContent>
                        <Typography
                            id="transition-modal-title"
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: "bold",
                                letterSpacing: "0.80px",
                                mb: "2rem",
                            }}
                        >
                            {t(`Privacy Policy Agreement`)}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Gizlilik Sözleşmesi")}</StyledSpan>
                            {t(`Bu gizlilik sözleşmesi ("Sözleşme"), [Şirket Adı]
                            ("Şirket") tarafından işletilen ve [Uygulama Adı]
                            ("Uygulama") adlı web sitesi veya mobil uygulama
                            üzerinden sağlanan hizmetlerle ilgili olarak
                            kullanıcılarımızın ("Kullanıcılar") gizliliğini
                            korumak için oluşturulmuştur. Bu Sözleşme, Uygulama
                            kullanımıyla ilgili olarak kullanıcılarımızın
                            kişisel bilgilerinin nasıl toplandığını,
                            kullanıldığını, korunduğunu ve ifşa edildiğini
                            açıklar.`)}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>
                                {t(`Kullanıcı Bilgilerinin Toplanması ve
                                Kullanılması`)}
                            </StyledSpan>
                            {t(`Uygulama, Kullanıcıların kaydolurken sağladıkları
                            kişisel bilgileri toplayabilir. Bu bilgiler arasında
                            isim, e-posta adresi, telefon numarası ve diğer
                            kişisel tanımlayıcı bilgiler bulunabilir.
                            Kullanıcıların sağladığı bilgiler, Uygulama
                            tarafından sunulan hizmetlerin sağlanması, kullanıcı
                            hesaplarının yönetimi, teknik destek sağlanması ve
                            hizmetlerle ilgili bildirimlerin iletilmesi gibi
                            amaçlarla kullanılabilir. Kullanıcıların kişisel
                            bilgileri asla üçüncü taraflarla paylaşılmayacak
                            veya satılmayacaktır, ancak yasal gereklilikler veya
                            Uygulama hizmetlerinin sunulması için gereken
                            durumlarda bilgiler yetkili kurumlarla
                            paylaşılabilir.`)}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Çerezler")}</StyledSpan>
                            {t(`Uygulama, Kullanıcı deneyimini geliştirmek ve
                            hizmetlerimizi daha etkili bir şekilde sunmak için
                            çerezler kullanabilir. Kullanıcılar, tarayıcılarının
                            ayarlarını değiştirerek çerez kullanımını
                            istedikleri şekilde kontrol edebilirler. Ancak, bazı
                            durumlarda bu, Uygulamanın bazı özelliklerinin
                            düzgün çalışmamasına neden olabilir.`)}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Güvenlik")}</StyledSpan>
                            {t(`Şirket, Kullanıcı bilgilerinin güvenliğini sağlamak
                            için ticari olarak kabul edilebilir fiziksel,
                            elektronik ve yönetimsel prosedürleri uygular.
                            Ancak, hiçbir veri iletimi veya depolama yönteminin
                            %100 güvenli olmadığını lütfen unutmayın.`)}
                        </Typography>
                        <Typography
                            sx={TypographyStyle}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>
                                {t(`Değişiklikler ve Güncellemeler`)}
                            </StyledSpan>
                            {t(`Bu Gizlilik Sözleşmesi, Uygulamanın gelişmesi veya
                            yasal gerekliliklerin değişmesi gibi nedenlerle
                            zaman zaman güncellenebilir. Güncellenmiş bir sürüm
                            yayınlandığında, Kullanıcılar bilgilendirilecek ve
                            değişikliklerin yürürlüğe girmesinden önce onay
                            istenecektir.`)}
                        </Typography>
                        <Typography
                            sx={{
                                paddingBottom: "3rem",
                                ...TypographyStyle,
                                display: "flex",
                                flexDirection: "column",
                            }}
                            variant="h5"
                            component="p"
                        >
                            <StyledSpan>{t("Kabul Edilmesi")}</StyledSpan>
                            {t(`Uygulamayı kullanarak, Kullanıcılar bu Gizlilik
                            Sözleşmesini kabul etmiş olurlar. Eğer bu Sözleşme
                            hükümlerini kabul etmiyorsanız, lütfen Uygulamayı
                            kullanmayın.`)}
                            <Button
                                onClick={onCloseModal}
                                sx={{
                                    color: "var(--color-grey-50)",
                                    transition: "all .3s",
                                    padding: "1.3rem 3.3rem",
                                    mt: "3rem",
                                    alignSelf: "center",
                                    fontSize: "1.2rem",
                                    border: "1px solid transparent",
                                    backgroundColor: "var(--color-green-new)",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor:
                                            "var(--color-green-lighter)",
                                        transform: "translateY(-2px)",
                                        border: "1px solid transparent",
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                }}
                                variant="outlined"
                            >
                                {t("I have read & Approve")}
                            </Button>
                        </Typography>
                    </StyledContent>
                </StyledBox>
            </Fade>
        </Modal>
    );
}
