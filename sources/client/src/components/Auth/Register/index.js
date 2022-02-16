import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import useRegisterUser from '../../../hooks/useRegisterUser';
import {
  CredentialsWrapper,
  Input,
  LockIcon,
  PersonIcon,
  PhoneIcon,
  RegisterButton,
  FullNameWrapper,
  LoginText,
} from './styles';

const Register = () => {
  const { registerUser } = useRegisterUser();
  const { data, onFormChange } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
  });
  return (
      <>
          <CredentialsWrapper>
              <FullNameWrapper>
                  <Input
                      name='firstName'
                      placeholder='Име'
                      style={{
                          width: '49%',
                      }}
                      value={data.firstName}
                      onChange={onFormChange}
                  />
                  <Input
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
                  name='password'
                  placeholder='Лозинка'
                  value={data.password}
                  onChange={onFormChange}
                  InputProps={{
                      startAdornment: <LockIcon />,
                  }}
                  type='password'
              />
          </CredentialsWrapper>
          <RegisterButton onClick={() => registerUser(data)}>
              Регистрирај се
          </RegisterButton>
          <LoginText>
              Имате Профил? <Link to='/login'>Најавете се!</Link>
          </LoginText>
      </>
  );
};

export default Register;
