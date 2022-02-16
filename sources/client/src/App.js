import AdminEmployeeHomeScreen from './screens/AdminHomeScreen';
import UserAndNotAuthScreen from './screens/UserAndNotAuthScreen';
import Alert from './components/Alert';
import BackgropLoader from './components/Loaders/BackdropLoader';
import { roles } from './config/enums';
import { UserContext } from './context/UserContext';
import { AccessoriesContext } from './context/AccessoriesContext';
import useIsMobile from './hooks/useIsMobile';
import { useState } from 'react';

import useFindUser from './hooks/useFindUser';
import Sidedrawer from './components/Sidedrawer';

function App(props) {
    const [alertData, setAlertData] = useState({
        type: 'error',
        msg: 'Не Сте Логирани!',
    });
    const setAlert = ({ type, msg }) => {
        setAlertData({ type, msg });
        setIsAlertOpen(true);
    };
    const { user, setUser, isLoading: isLoadingUser } = useFindUser({ setAlert });
    const { isMobile } = useIsMobile();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isBackdropLoaderOpen, setIsBackdropLoaderOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    let displayScreen;
    if (user && (user.role === roles.admin || user.role === roles.employee)) {
        displayScreen = <AdminEmployeeHomeScreen />;
    } else {
        displayScreen = <UserAndNotAuthScreen />;
    }

    return (
        <UserContext.Provider value={{ user, setUser, isLoadingUser }}>
            <AccessoriesContext.Provider
                value={{
                    isMobile,
                    setAlert,
                    setIsBackdropLoaderOpen,
                    setIsOpenDrawer,
                }}
            >
                <Sidedrawer
                    isOpen={isOpenDrawer}
                    setIsOpen={setIsOpenDrawer}
                    isMobile={isMobile}
                />
                <BackgropLoader
                    isBackdropLoaderOpen={isBackdropLoaderOpen}
                    isMobile={isMobile}
                />
                <Alert
                    isOpen={isAlertOpen}
                    setIsOpen={setIsAlertOpen}
                    type={alertData.type}
                    msg={alertData.msg}
                />
                {displayScreen}
            </AccessoriesContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
