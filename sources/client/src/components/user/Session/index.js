import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import moment from 'moment';

import SessionGuest from './SessionGuest';
import SessionUser from './SessionUser';
import Buttons from './Buttons';
import AbsoluteLoader from '../../Loaders/AbsoluteLoader';
import { IconButton, Slide } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    Wrapper,
    ButtonWrapper,
    ModalContainer,
    CloseIcon,
    KeyValueWrapper,
    Key,
    Value,
    PaymentMethodWrapper,
    PayWithText,
    PaymentMethodsWrapper,
    PayButtonWrapper,
    ModalPayButton,
    CardDetails,
    DateAndCCVWrapper,
    ModalInput,
    CreditCard,
    ModalInputCardNumber,
} from './styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

import {
    roles,
    sessionStatus as enumsSessionStatus,
} from '../../../config/enums';
import theme from '../../../theme';
import { UserContext } from '../../../context/UserContext';
import useUserStartSession from '../../../hooks/useUserStartSession';
import useForm from '../../../hooks/useForm';
import useUserFinishedSession from '../../../hooks/useUserFinishedSession';
import useUserPayForSession from '../../../hooks/useUserPayForSession';
import useGetSessionOverInfo from '../../../hooks/useGetSessionOverInfo';
import useGetData from '../../../hooks/useGetData';

import { convertMinutesToString } from '../../../utils/convertMinToString';

const normalizeSesionData = session => ({
    plate: session?.plate?.plate ?? '',
    zone: session?.parkingZone?.pzName ?? ''
});

const defaultTime = 15000;
const Session = () => {
    // const [timer, setTimer] = useState(10000);
    // let timer = 10000;
    // const timerInterval = setInterval(() => {
    //     console.log('VIKTOR', timer);
    //     // setTimer(defaultTime);
    //     timer = 15000;
    // }, timer);
    // useEffect(() => {
    //     return () => {
    //         clearInterval(timerInterval);
    //     }
    // })
    const { data: fetchedSelectZones, isLoading: isLoadingSelectZones } =
        useGetData({ url: '/parkingZone/parkingZoneNames' });
    const { user } = useContext(UserContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpDate, setCardExpDate] = useState('');
    const [cardCCV, setCardCCV] = useState('');
    const { data: session, isLoading: isLoadingSession, setData: setSession } = useGetData({
        url: '/parkingSession',
    });
    console.log('SESSION', session);
    const {
        data: userSessionInfo,
        onFormChange: onFormChangeUserSessionInfo,
        setNewData: setNewUserSessionData,
    } = useForm({
        plate: 'NONE',
        zone: 'NONE',
    });
    const { userFinishedSession } = useUserFinishedSession();
    const timerRef = useRef(0);
    const { userStartSession } = useUserStartSession();
    const { userPayForSession, isLoading: isLoadingPayForSession } =
        useUserPayForSession();
    const {
        getSessionInfoOver,
        isLoading: isLoadingSessionInfoOver,
        totalPrice,
    } = useGetSessionOverInfo();
    const cardNumberHandler = (e) => {
        const newVal = e.target.value.replace(/\s+/g, '');
        let parts = [];
        for (let i = 0; i < newVal.length; i += 4) {
            parts.push(newVal.substring(i, i + 4));
        }
        console.log(parts);
        if (parts.length) {
            setCardNumber(parts.join(' '));
        } else {
            setCardNumber(newVal);
        }
    };

    const cardExpDateHandler = (e) => {
        const newVal = e.target.value.replace(/[^0-9]/, '');
        let first = newVal.substring(0, 2);
        let second = newVal.substring(2, 4);
        if (second !== '') {
            setCardExpDate([first, second].join('/'));
        } else {
            setCardExpDate(newVal);
        }
    };

    const handleStartSession = () => {
        userStartSession({ sessionData: userSessionInfo, setSession });
    };

    const handleEndSession = () => {
        userFinishedSession({ setSession });
    };

    const handlePayForSession = () => {
        if (paymentMethod) {
            if (
                paymentMethod === 'card' &&
                (cardNumber === '' || cardCCV === '' || cardExpDate === '')
            ) {
                return;
            }
            let paymentCredentials = null;
            if (paymentMethod === 'card') {
                paymentCredentials = {
                    cardNumber: cardNumber,
                    cardExpDate: cardExpDate,
                    cardCCV: cardCCV,
                };
            }
            userPayForSession({
                method: paymentMethod,
                paymentCredentials,
            });
        }
    };

    const checkForDoubleClick = (e) => {
        timerRef.current++;
        setTimeout(() => {
            if (timerRef.current !== 0) {
                timerRef.current = 0;
            }
        }, 500);
        if (timerRef.current >= 2) {
            timerRef.current = 0;
            if (!session) {
                handleStartSession();
            } else if (
                session.status === enumsSessionStatus.active ||
                session.status === enumsSessionStatus.idle
            ) {
                handleEndSession();
            }
        }
    };

    const handlePayButton = () => {
        setModalOpen(true);
        if (totalPrice) return; // don't send request if they are already set
        getSessionInfoOver();
    };

    useEffect(() => {
        if(session) {
            setNewUserSessionData(normalizeSesionData(session));
        }
    }, [session])

    const totalTime = useMemo(() => {
        if(session?.timeEnd && session?.timeStart) {
            const start = moment(session.timeStart);
            const end = moment(session.timeEnd);
            const diffMin = Math.round(end.diff(start) / 60000);
            return convertMinutesToString(diffMin);
        }
        return null;
    }, [session])

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
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
                                marginLeft: 295,
                            }}
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {isLoadingSessionInfoOver ? ( // TODO FETCH SESSION DATA
                            <AbsoluteLoader
                                containerStyle={{
                                    width: '200px',
                                    height: '200px',
                                    margin: 'auto',
                                    marginTop: '50px',
                                }}
                            />
                        ) : (
                            <>
                                <KeyValueWrapper>
                                    <Key>Време:</Key>
                                    <Value>{totalTime}</Value>
                                </KeyValueWrapper>
                                <KeyValueWrapper>
                                    <Key>Вкупна сума:</Key>
                                    <Value>{totalPrice} ден.</Value>
                                </KeyValueWrapper>
                                <PaymentMethodWrapper>
                                    <PayWithText>Плати со:</PayWithText>
                                    <PaymentMethodsWrapper>
                                        <RadioGroup
                                            aria-label='payment-methods'
                                            name='payment-method'
                                            value={paymentMethod}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        >
                                            <FormControlLabel
                                                value='mobile'
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: theme.palette
                                                                .primary.main,
                                                            '&.Mui-checked': {
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                            },
                                                        }}
                                                    />
                                                }
                                                label='Мобилен'
                                                labelPlacement='start'
                                            />
                                            <FormControlLabel
                                                value='card'
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: theme.palette
                                                                .primary.main,
                                                            '&.Mui-checked': {
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                            },
                                                        }}
                                                    />
                                                }
                                                label='Картичка'
                                                labelPlacement='start'
                                            />
                                        </RadioGroup>
                                    </PaymentMethodsWrapper>
                                </PaymentMethodWrapper>
                                {paymentMethod === 'card' ? (
                                    <CardDetails>
                                        <ModalInputCardNumber
                                            InputProps={{
                                                startAdornment: <CreditCard />,
                                            }}
                                            onChange={cardNumberHandler}
                                            value={cardNumber}
                                        />
                                        <DateAndCCVWrapper>
                                            <ModalInput
                                                InputProps={{
                                                    placeholder: 'Exp: 11/21',
                                                }}
                                                style={{
                                                    width: '45%',
                                                }}
                                                onChange={cardExpDateHandler}
                                                value={cardExpDate}
                                            />
                                            <ModalInput
                                                InputProps={{
                                                    placeholder: 'CCV',
                                                }}
                                                style={{ width: '35%' }}
                                                value={cardCCV}
                                                onChange={(e) =>
                                                    setCardCCV(e.target.value)
                                                }
                                            />
                                        </DateAndCCVWrapper>
                                    </CardDetails>
                                ) : null}
                                <PayButtonWrapper>
                                    {isLoadingPayForSession ? (
                                        <AbsoluteLoader
                                            containerStyle={{
                                                width: '51px',
                                                height: '51px',
                                                margin: 'auto',
                                            }}
                                        />
                                    ) : (
                                        <ModalPayButton
                                            onClick={handlePayForSession}
                                        >
                                            Плати
                                        </ModalPayButton>
                                    )}
                                </PayButtonWrapper>
                            </>
                        )}
                    </ModalContainer>
                </Slide>
            </Modal>
            {!isLoadingSession && (
                <Wrapper>
                    {user.role === roles.user ? (
                        <SessionUser
                            sessionStatus={session?.status ?? null}
                            sessionInfo={normalizeSesionData(session)}
                            zones={fetchedSelectZones ?? []}
                            data={userSessionInfo}
                            onFormChange={onFormChangeUserSessionInfo}
                            setNewData={setNewUserSessionData}
                        />
                    ) : (
                        <SessionGuest
                            sessionStatus={session?.status ?? null}
                            sessionInfo={normalizeSesionData(session)}
                            zones={fetchedSelectZones ?? []}
                            data={userSessionInfo}
                            onFormChange={onFormChangeUserSessionInfo}
                            setNewData={setNewUserSessionData}
                        />
                    )}
                    <ButtonWrapper>
                        <Buttons
                            status={session?.status ?? null}
                            handlePayButton={handlePayButton}
                            onClick={checkForDoubleClick}
                        />
                    </ButtonWrapper>
                </Wrapper>
            )}
        </>
    );
};

export default Session;
