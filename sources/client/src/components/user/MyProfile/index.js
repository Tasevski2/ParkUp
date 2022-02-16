import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import useUpdateUserProfile from '../../../hooks/useUpdateUserProfile';
import useGetData from '../../../hooks/useGetData';

import {
    CredentialsWrapper,
    Input,
    LockIcon,
    PersonIcon,
    PhoneIcon,
    EditButton,
    FullNameWrapper,
    Wrapper,
    ButtonsWrapper,
    SaveButton,
    CancelButton,
    LockOpenIcon,
} from './styles';
import { IconButton } from '@mui/material';

import { UserContext } from '../../../context/UserContext';

const normalizeProfile = (profile) => ({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    mobile: profile.mobile,
    plates: profile.plates
});

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const { data: userProfile, isLoading: isUserProfileLoading } = useGetData({
        url: `/registriranParkirac/${user.id}`,
    });
    const [isEditActivated, setIsEditActivated] = useState(false);
    const { data, onFormChange, setNewData } = useForm(null);
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { updateUserProfile } = useUpdateUserProfile();

    const handleEditButton = () => {
        setIsEditActivated(true);
    };

    const handleOnCancel = () => {
        setIsEditActivated(false);
        setNewData(normalizeProfile(userProfile));
        setPassword('');
    };

    const successfulSave = () => {
        setIsEditActivated(false);
        setPassword('');
    }

    const handleOnSave = () => {
        const updatedUserData = {
            ...data,
            password,
        };
        updateUserProfile({
            userData: updatedUserData,
            id: user.id,
            successfulSave,
        });
    };

    useEffect(() => {
        if(!userProfile) return;
        setNewData(normalizeProfile(userProfile));
    }, [userProfile]);

    return (
        <Wrapper>
            <CredentialsWrapper>
                <FullNameWrapper>
                    <Input
                        disabled={!isEditActivated}
                        name='firstName'
                        placeholder='Име'
                        style={{
                            width: '49%',
                        }}
                        value={data.firstName}
                        onChange={onFormChange}
                    />
                    <Input
                        disabled={!isEditActivated}
                        name='lastName'
                        placeholder='Презиме'
                        style={{
                            width: '49%',
                        }}
                        value={data.lastName}
                        onChange={onFormChange}
                    />
                </FullNameWrapper>
                <Input
                    disabled={!isEditActivated}
                    name='mobile'
                    placeholder='Телефонски број'
                    value={data.mobile}
                    onChange={onFormChange}
                    InputProps={{
                        startAdornment: <PhoneIcon />,
                    }}
                />
                <Input
                    disabled={!isEditActivated}
                    name='email'
                    placeholder='Емаил адреса'
                    value={data.email}
                    onChange={onFormChange}
                    InputProps={{
                        startAdornment: <PersonIcon />,
                    }}
                />
                <Input
                    disabled={!isEditActivated}
                    name='password'
                    placeholder='Лозинка'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <IconButton
                                style={{ padding: 0 }}
                                onClick={() =>
                                    setIsPasswordVisible(
                                        !isPasswordVisible && isEditActivated
                                    )
                                }
                            >
                                {isPasswordVisible ? (
                                    <LockOpenIcon />
                                ) : (
                                    <LockIcon />
                                )}
                            </IconButton>
                        ),
                    }}
                    type={
                        isPasswordVisible && isEditActivated
                            ? 'text'
                            : 'password'
                    }
                />
            </CredentialsWrapper>
            {isEditActivated ? (
                <ButtonsWrapper>
                    <CancelButton onClick={handleOnCancel}>Откажи</CancelButton>
                    <SaveButton onClick={handleOnSave}>Сочувај</SaveButton>
                </ButtonsWrapper>
            ) : (
                <EditButton onClick={handleEditButton}>Уреди</EditButton>
            )}
        </Wrapper>
    );
};

export default MyProfile;
