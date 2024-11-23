import { Button, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { remainingTime } from '../../Utils/utils';
import { useState } from 'react';
import EditAgreementModal from '../Modals/Agreements/EditAgreementModal';
import { useSearchParams } from 'react-router-dom';
import DeleteAgreementModal from '../Modals/Agreements/DeleteAgreementModal';

const StyledDivider = styled(Divider)`
  color: var(--color-green-lighter);
  font-weight: bold;

  & > .MuiDivider-wrapper::before {
    border-top: thin solid rgba(255, 255, 255, 1) !important;
  }
`;

const StyledTitle = styled.h3`
  color: var(--color-grey-900);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
`;

const StyledDescription = styled.p`
  color: var(--color-grey-500);
  font-size: 1.4rem;
`;

export default function Agreements({
  agreement,
  currentCompany,
}: {
  agreement: any;
  currentCompany: any;
}) {
  const { t } = useTranslation();
  const [opensEdit, setOpensEdit] = useState(false);
  const [opensDelete, setOpensDelete] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpenEdit = () => {
    setOpensEdit(true);
    setSearchParams('edit-agreement');
  };
  const handleCloseEdit = () => {
    setOpensEdit(false);
    setTimeout(() => {
      setSearchParams('');
    }, 500);
  };
  const handleOpenDelete = () => {
    setOpensDelete(true);
    setSearchParams('delete-agreement');
  };
  const handleCloseDelete = () => {
    setOpensDelete(false);
    setTimeout(() => {
      setSearchParams('');
    }, 500);
  };

  console.log(agreement.agreementEndDate);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-grey-100)',
        ':hover': {
          cursor: 'pointer',
        },
        marginLeft: '0px',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          paddingTop: '0',
          mb: '1rem',
        }}
      >
        <StyledDivider>{agreement.createdAt}</StyledDivider>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{
          border: '1px solid var(--color-grey-200)',
          paddingBottom: '2rem',
          borderTopLeftRadius: '5px',
        }}
      >
        <StyledTitle>{t(`Agreement Content`)}</StyledTitle>
        <StyledDescription>
          {agreement?.agreementContent || t('Not spesified')}
        </StyledDescription>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{
          border: '1px solid var(--color-grey-200)',
          paddingBottom: '2rem',
        }}
      >
        <StyledTitle>{t(`Agreement Budget`)}</StyledTitle>
        <StyledDescription>
          {agreement?.agreementBudget || t('Not spesified')}
        </StyledDescription>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{
          border: '1px solid var(--color-grey-200)',
          paddingBottom: '2rem',
          borderTopRightRadius: '5px',
        }}
      >
        <StyledTitle>{t(`Agreement Parties`)}</StyledTitle>
        <StyledDescription>
          {agreement?.agreementParties || t('Not spesified')}
        </StyledDescription>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{
          border: '1px solid var(--color-grey-200)',
          paddingBottom: '2rem',
          borderBottomLeftRadius: '5px',
        }}
      >
        <StyledTitle>{t(`Agreement Start Date`)}</StyledTitle>
        <StyledDescription>
          {agreement?.agreementStartDate || t('Not spesified')}
        </StyledDescription>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{
          border: '1px solid var(--color-grey-200)',
          paddingBottom: '2rem',
        }}
      >
        <StyledTitle>{t(`Agreement End Date`)}</StyledTitle>
        <StyledDescription>
          {agreement?.agreementEndDate || t('Not spesified')}
        </StyledDescription>
      </Grid>
      <Grid
        item
        xs={6}
        md={4}
        sx={{
          border: '1px solid var(--color-grey-200)',
          paddingBottom: '2rem',
          borderBottomRightRadius: '5px',
        }}
      >
        <StyledTitle>{t(`Agreement Remaining Time`)}</StyledTitle>
        <StyledDescription>
          {remainingTime(agreement.agreementEndDate) || t('Not spesified')}
        </StyledDescription>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <Button
          onClick={handleOpenEdit}
          sx={{
            backgroundColor: 'var(--color-grey-800)',
            color: 'var(--color-grey-50)',
            transition: 'all .3s',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'var(--color-grey-700)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
          variant="contained"
        >
          {t('Edit Agreement')}
        </Button>
        <Button
          onClick={handleOpenDelete}
          sx={{
            backgroundColor: 'var(--color-red-700)',
            color: 'white',
            transition: 'all .3s',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'var(--color-red-800)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
          variant="contained"
        >
          {t('Delete Agreement')}
        </Button>
      </Grid>
      {searchParams.has('edit-agreement') && (
        <EditAgreementModal
          agreement={agreement}
          open={opensEdit}
          handleClose={handleCloseEdit}
          currentCompany={currentCompany}
        />
      )}
      {searchParams.has('delete-agreement') && (
        <DeleteAgreementModal
          agreement={agreement}
          open={opensDelete}
          handleClose={handleCloseDelete}
          currentCompany={currentCompany}
        />
      )}
    </Grid>
  );
}
