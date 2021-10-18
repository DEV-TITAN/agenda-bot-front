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
import * as Yup from 'yup';

import getValidationErrors from '../../../helpers/errorsValidation';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, AnimationContainer } from './style';

function LoginComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

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
      </AnimationContainer>
    </Container>
  );
}

export const Login = observer(LoginComp);
