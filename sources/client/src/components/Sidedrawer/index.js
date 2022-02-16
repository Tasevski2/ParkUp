import { useContext } from 'react';
import { useHistory } from 'react-router';
import {
    DrawerContainer,
    CloseIcon,
    DividerUnderListItem,
    DividerUnderList,
    DashboardIcon,
    SupervisorAccountIcon,
    LogoutIcon,
    UserIcon,
    MapIcon,
    CarIcon,
    TimerIcon,
    ProfileIcon,
    LoginIcon,
    RegistrationIcon,
} from './styles';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';

import onClickRouting from '../../utils/onClickRouting';
import { roles } from '../../config/enums';
import { UserContext } from '../../context/UserContext';
import useLogoutUser from '../../hooks/useLogoutUser';

const AdminAndEmployeeContent = ({ user, setIsOpen, history, logoutUser }) => {
    return (
        <>
            <List>
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        onClickRouting('/', history);
                    }}
                >
                    <ListItemIcon>
                        <DashboardIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Зони' />
                </ListItem>
                <DividerUnderListItem />
                {user.role === roles.admin ? (
                    <>
                        <ListItem
                            onClick={() => {
                                setIsOpen(false);
                                onClickRouting('/employees', history);
                            }}
                        >
                            <ListItemIcon>
                                <SupervisorAccountIcon style={{ margin: 0 }} />
                            </ListItemIcon>
                            <ListItemText primary='Вработени' />
                        </ListItem>
                        <DividerUnderListItem />
                    </>
                ) : null}
            </List>
            <List>
                <DividerUnderList />
                <ListItem>
                    <ListItemIcon>
                        <UserIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                    />
                </ListItem>
                <DividerUnderListItem />
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        logoutUser();
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Одјави Се' id='err-color' />
                </ListItem>
            </List>
        </>
    );
};

const NotAuthContent = ({ setIsOpen, history }) => {
    return (
        <>
            <List>
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        onClickRouting('/', history);
                    }}
                >
                    <ListItemIcon>
                        <MapIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Мапа' />
                </ListItem>
                <DividerUnderListItem />
            </List>
            <List>
                <DividerUnderList />
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        onClickRouting('/login', history);
                    }}
                >
                    <ListItemIcon>
                        <LoginIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Најави Се' />
                </ListItem>
                <DividerUnderListItem />
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        onClickRouting('/register', history);
                    }}
                >
                    <ListItemIcon>
                        <RegistrationIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Регистрирај Се' />
                </ListItem>
            </List>
        </>
    );
};

const UserAndGuestContent = ({ user, logoutUser, setIsOpen, history }) => {
    const isGuest = user.role === roles.guest;
    const mapUrl = isGuest ? '/' : '/maps';
    return (
        <>
            <List>
                {isGuest ? null : (
                    <>
                        <ListItem
                            onClick={() => {
                                setIsOpen(false);
                                onClickRouting('/', history);
                            }}
                        >
                            <ListItemIcon>
                                <CarIcon style={{ margin: 0 }} />
                            </ListItemIcon>
                            <ListItemText primary='Почетна' />
                        </ListItem>
                        <DividerUnderListItem />
                    </>
                )}
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        onClickRouting(mapUrl, history);
                    }}
                >
                    <ListItemIcon>
                        <MapIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Мапа' />
                </ListItem>
                <DividerUnderListItem />
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        onClickRouting('/session', history);
                    }}
                >
                    <ListItemIcon>
                        <TimerIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Сесија' />
                </ListItem>
                <DividerUnderListItem />
            </List>
            <List>
                <DividerUnderList />
                <ListItem
                    onClick={() => {
                        if (isGuest) return;
                        setIsOpen(false);
                        onClickRouting('/my-profile', history);
                    }}
                >
                    <ListItemIcon>
                        <UserIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            isGuest
                                ? 'Гостин'
                                : `${user.firstName} ${user.lastName}`
                        }
                    />
                </ListItem>
                <DividerUnderListItem />
                <ListItem
                    onClick={() => {
                        setIsOpen(false);
                        logoutUser();
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon style={{ margin: 0 }} />
                    </ListItemIcon>
                    <ListItemText primary='Одјави Се' id='err-color' />
                </ListItem>
            </List>
        </>
    );
};

const Sidedrawer = ({ isOpen, setIsOpen, isMobile }) => {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogoutUser();
    const history = useHistory();

    let content;

    if (user) {
        const props = {
            user,
            logoutUser,
            setIsOpen,
            history,
        };
        if (user.role === roles.admin || user.role === roles.employee) {
            content = <AdminAndEmployeeContent {...props} />;
        } else {
            content = <UserAndGuestContent {...props} />;
        }
    } else {
        content = <NotAuthContent setIsOpen={setIsOpen} history={history} />;
    }

    return !isMobile ? null : (
        <SwipeableDrawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
        >
            <DrawerContainer>
                <IconButton
                    onClick={() => setIsOpen(false)}
                    style={{ marginLeft: '190px' }}
                >
                    <CloseIcon />
                </IconButton>
                {content}
            </DrawerContainer>
        </SwipeableDrawer>
    );
};

export default Sidedrawer;
