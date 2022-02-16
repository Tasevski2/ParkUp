import { useContext, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import HeaderUserAndAuth from '../../components/HeaderUserAndAuth';
import { AccessoriesContext } from '../../context/AccessoriesContext';
import { Wrapper, ScreenWrapper } from './styles';
import { UserContext } from '../../context/UserContext';
import { roles } from '../../config/enums';

import Landing from '../../components/user/Landing'; //       USER
import MyProfile from '../../components/user/MyProfile';
// MapUsers - same as guest and auth but diffrent url         USER
import Session from '../../components/user/Session'; //       USER and GUEST
import Auth from '../../components/Auth'; //                  NOT AUTH
import MapUsers from '../../components/user/MapUsers'; // TODO     GUEST and NOT AUTH

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

const UserAndNotAuthScreen = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const { isMobile } = useContext(AccessoriesContext);
    const [isUserParked, setIsUserParked] = useState(false); // TODO FETCH
    const asphaltBg =
        user && user.role === roles.user && location.pathname === '/';
    const mapUrl = user && user.role === roles.user ? '/maps' : '/';
    const options = {
        enableMouseEvents: true,
    };
    const content = (
        <Wrapper asphaltBg={asphaltBg}>
            <DndProvider backend={TouchBackend} options={options}>
                <HeaderUserAndAuth />
                <Switch>
                    {!user ? ( // NOT AUTH ROUTES
                        <Auth />
                    ) : (
                        <>
                            {user.role === roles.user ? ( // USER ROUTES
                                <>
                                    <Route
                                        exact
                                        path={'/'}
                                        component={() => (
                                            <Landing
                                                isParked={isUserParked}
                                                setIsParked={setIsUserParked}
                                            />
                                        )}
                                    />

                                    <Route
                                        exact
                                        path={'/my-profile'}
                                        component={MyProfile}
                                    />
                                </>
                            ) : null}
                            {/* USER AND GUEST ROUTES */}
                            <Route exact path='/session' component={Session} />
                            <Route exact path={mapUrl} component={MapUsers} />
                            <Redirect to='/' />
                        </>
                    )}
                    {/* USER, GUEST AND NOT AUTH ROUTES */}
                    <Redirect to='/' />
                </Switch>
            </DndProvider>
        </Wrapper>
    );

    return isMobile ? content : <ScreenWrapper>{content}</ScreenWrapper>;
};

export default UserAndNotAuthScreen;
