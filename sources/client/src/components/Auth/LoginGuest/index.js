import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import useLoginGuest from '../../../hooks/useLoginGuest';

import {
  CredentialsWrapper,
  Input,
  PersonIcon,
  PhoneIcon,
  CarIcon,
  SignInButton,
  LoginText,
} from './styles';

const LoginGuest = () => {
  const {loginGuest} = useLoginGuest();
  const { data, onFormChange } = useForm({
    mobile: '',
    email: '',
    plate: '',
  });
  return (
      <>
          <CredentialsWrapper>
              <Input
                  name='mobile'
                  placeholder='Телефонски број'
                  value={data.mobile}
                  onChange={onFormChange}
                  InputProps={{
                      startAdornment: <PhoneIcon />,
                  }}
              />
              <Input
                  name='email'
                  placeholder='Емаил адреса'
                  value={data.email}
                  onChange={onFormChange}
                  InputProps={{
                      startAdornment: <PersonIcon />,
                  }}
              />
              <Input
                  name='plate'
                  placeholder='Таблица...SK-8190-AV'
                  value={data.plate}
                  onChange={onFormChange}
                  InputProps={{
                      startAdornment: <CarIcon />,
                  }}
              />
          </CredentialsWrapper>
          <SignInButton onClick={() => loginGuest({ credentials: data })}>
              НАЈАВА КАКО ГОСТИН
          </SignInButton>
          <LoginText>
              Имате Профил? <Link to='/login'>Најавете се!</Link>
          </LoginText>
      </>
  );
};

export default LoginGuest;
