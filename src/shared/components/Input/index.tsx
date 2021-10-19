import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useField } from '@unform/core';
import { observer } from 'mobx-react';
import type { InputHTMLAttributes } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Colors } from '../../../styles/colors';
import { Container, Error } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onIconClick?(): void;
  icon?: IconDefinition;
  iconPassword?: IconDefinition;
}

function InputComp({
  name,
  onIconClick,
  icon: Icon,
  iconPassword: IconPassword,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(Boolean(inputRef.current?.value));
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={Boolean(error)}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && (
        <FontAwesomeIcon
          icon={Icon}
          onClick={onIconClick}
          color={Colors.WHITE}
        />
      )}

      <input
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        name={name}
        {...rest}
      />

      {IconPassword && (
        <FontAwesomeIcon
          icon={IconPassword}
          onClick={onIconClick}
          color={Colors.WHITE}
        />
      )}

      {error && (
        <Error title={error}>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color={Colors.WHITE}
            size="sm"
          />
        </Error>
      )}
    </Container>
  );
}

export const Input = observer(InputComp);
