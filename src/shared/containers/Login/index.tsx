import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import type { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../../assets/logo.png';
import getValidationErrors from '../../../helpers/errorsValidation';
import { useStores } from '../../../stores/RootStore';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, AnimationContainer, Content, Logo } from './style';

function LoginComp() {
  const { authStore } = useStores();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(async (data: object) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const email = formRef.current?.getFieldValue('email');

      const password = formRef.current?.getFieldValue('password');

      await authStore.signIn(email, password).then(() => {
        history.push('/agendamentos');
        window.location.reload();
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <AnimationContainer>
        <Content>
          <Logo>
            <img src={logo} alt="tela vazia" />
            <h1>Agenda Bot</h1>
          </Logo>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" icon={faEnvelope} placeholder="E-mail" />

            <Input
              name="password"
              icon={faLock}
              iconPassword={showPassword ? faEye : faEyeSlash}
              type={showPassword ? 'text' : 'password'}
              onIconClick={() => setShowPassword(!showPassword)}
              placeholder="Senha"
            />

            <Button
              type="submit"
              buttonSize="medium"
              buttonType="primary"
              loading={loading}
            >
              Entrar
            </Button>
          </Form>
        </Content>
      </AnimationContainer>
    </Container>
  );
}

export const Login = observer(LoginComp);
