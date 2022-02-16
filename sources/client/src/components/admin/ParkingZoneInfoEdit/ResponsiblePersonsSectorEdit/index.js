import { useState } from 'react';
import {
  Wrapper,
  TitleAndDividerWrapper,
  Title,
  DividerUnderTitle,
  TableWrapper,
  Elipsis,
  AddIcon,
  DeleteIcon,
  ModalContainer,
  CloseIcon,
  ModalCard,
  ModalCardKeyAndValueWrapper,
  ModalCardKey,
  ModalCardValue,
  AddIconCard,
  ModalCardsContainer,
  ModalKeyAndValueDivider,
  ModalNoMoreEmplyees,
} from './styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { IconButton, Slide } from '@mui/material';
import AbsoluteLoader from '../../../Loaders/AbsoluteLoader';

const AddEmployeeCard = ({ workerId, email, firstName, lastName, handleChange }) => (
  <ModalCard>
    <IconButton
      style={{
        position: 'absolute',
        right: -60,
      }}
      onClick={() =>
        handleChange({
          type: 'add',
          person: { workerId, email, firstName, lastName },
        })
      }
    >
      <AddIconCard />
    </IconButton>
    <ModalCardKeyAndValueWrapper style={{ width: '250px' }}>
      <ModalCardKey>Емаил:</ModalCardKey>
      <ModalCardValue>{email}</ModalCardValue>
    </ModalCardKeyAndValueWrapper>
    <ModalKeyAndValueDivider />
    <ModalCardKeyAndValueWrapper style={{ width: '130px' }}>
      <ModalCardKey>Име:</ModalCardKey>
      <ModalCardValue>{firstName}</ModalCardValue>
    </ModalCardKeyAndValueWrapper>
    <ModalKeyAndValueDivider />
    <ModalCardKeyAndValueWrapper style={{ width: '130px' }}>
      <ModalCardKey>Презиме:</ModalCardKey>
      <ModalCardValue>{lastName}</ModalCardValue>
    </ModalCardKeyAndValueWrapper>
  </ModalCard>
);

const ResponsiblePersonsSectorEdit = ({
    responsiblePersons,
    employeesDataModal,
    handleChange,
    isLoadingResponsiblePersonsData,
}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
            <Modal
                open={isModalOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    onClick: () => setModalOpen(false),
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Slide in={isModalOpen}>
                    <ModalContainer>
                        <IconButton
                            style={{
                                marginLeft: 640,
                            }}
                            onClick={() => setModalOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <ModalCardsContainer>
                            {isLoadingResponsiblePersonsData ? (
                                <AbsoluteLoader
                                    containerStyle={{
                                        width: '200px',
                                        height: '200px',
                                        margin: 'auto',
                                        marginTop: '30px',
                                    }}
                                />
                            ) : (
                                <>
                                    {employeesDataModal.length === 0 ? (
                                        <ModalNoMoreEmplyees>
                                            Нема Повеќе Вработени
                                        </ModalNoMoreEmplyees>
                                    ) : (
                                        employeesDataModal.map((emp) => (
                                            <AddEmployeeCard
                                                {...emp}
                                                key={emp.workerId}
                                                handleChange={handleChange}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                        </ModalCardsContainer>
                    </ModalContainer>
                </Slide>
            </Modal>
            <Wrapper>
                <TitleAndDividerWrapper>
                    <Title>Одговорни Лица</Title>
                    <DividerUnderTitle />
                </TitleAndDividerWrapper>
                <TableWrapper>
                    <IconButton
                        style={{
                            position: 'absolute',
                            right: 5,
                        }}
                        onClick={() => setModalOpen(true)}
                    >
                        <AddIcon />
                    </IconButton>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Име</th>
                                <th>Презиме</th>
                                <th>Повеќе</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responsiblePersons.map((person, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <IconButton
                                                onClick={() =>
                                                    handleChange({
                                                        type: 'delete',
                                                        person,
                                                    })
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                        <td>{person.firstName}</td>
                                        <td>{person.lastName}</td>
                                        <td>
                                            <Elipsis
                                                target='_blank'
                                                to={`/employees/${person.id}`}
                                            >
                                                ...
                                            </Elipsis>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </TableWrapper>
            </Wrapper>
        </>
    );
};

export default ResponsiblePersonsSectorEdit;
