import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import useLogin from '../../../hooks/useLogin';

import {
  CredentialsWrapper,
  DividerButtons,
  DividerText,
  Input,
  LockIcon,
  PersonIcon,
  SignInButton,
  ButtonsWrapper,
  RegisterText,
} from './styles';

const Login = () => {
  const { loginUser } = useLogin();
  const { data, onFormChange } = useForm({
    email: '',
    password: '',
  });
  let history = useHistory();
  const handleSignIn = () => {
    loginUser({ email: data.email, password: data.password });
  };
  return (
    <>
      <CredentialsWrapper>
        <Input
          name='email'
          placeholder='Емаил'
          value={data.email}
          onChange={onFormChange}
          InputProps={{
            startAdornment: <PersonIcon />,
          }}
        />
        <Input
          name='password'
          value={data.password}
          placeholder='Лозинка'
          onChange={onFormChange}
          InputProps={{
            startAdornment: <LockIcon />,
          }}
          type='password'
        />
      </CredentialsWrapper>
      <ButtonsWrapper>
        <SignInButton onClick={handleSignIn}>НАЈАВА</SignInButton>
        <DividerButtons>
          <DividerText>ИЛИ</DividerText>
        </DividerButtons>
        <SignInButton onClick={() => history.push('/login-guest')}>
          НАЈАВА КАКО ГОСТИН
        </SignInButton>
        {/* TODO Neka nosi do '/login-guest'*/}
      </ButtonsWrapper>
      <RegisterText>
        {' '}
        {/* TODO Neka nosi do '/register' */}
        Немате Профил?
        <Link to='/register'>Регистрирај се!</Link>
      </RegisterText>
    </>
  );
};

export default Login;
