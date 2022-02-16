import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthWrapper } from './styles';

import Login from './Login';
import LoginGuest from './LoginGuest';
import Register from './Register';
import MapUsers from '../user/MapUsers';

const Auth = () => {
    return (
        <AuthWrapper>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/login-guest' component={LoginGuest} />
                <Route exact path='/register' component={Register} />
                <Route exact path={'/'} component={MapUsers} />
                <Redirect to='/' />
            </Switch>
        </AuthWrapper>
    );
};

export default Auth;
