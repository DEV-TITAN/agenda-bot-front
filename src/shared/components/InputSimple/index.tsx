import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import type { InputHTMLAttributes } from 'react';
import React, { useCallback, useState } from 'react';

import { Colors } from '../../../styles/colors';
import { Container, Error } from './style';

interface InputSimpleProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onIconClick?(): void;
  icon?: IconDefinition;
  iconPassword?: IconDefinition;
  label?: string;
  initialValue?: any;
  error?: string;
  handleOnChange(value: any): void;
}

function InputSimpleComp({
  handleOnChange,
  onIconClick,
  initialValue,
  error,
  icon: Icon,
  iconPassword: IconPassword,
  ...rest
}: InputSimpleProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(Boolean(value));
  }, []);

  function onValueChange(val: any) {
    setValue(val);
    handleOnChange(val);
  }

  return (
    <>
      <Container
        isErrored={Boolean(error)}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && <FontAwesomeIcon icon={Icon} onClick={onIconClick} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
          onChange={e => {
            e.preventDefault();
            onValueChange(e.target.value);
          }}
        />

        {IconPassword && (
          <FontAwesomeIcon icon={IconPassword} onClick={onIconClick} />
        )}
      </Container>

      {error && <Error>{error}</Error>}
    </>
  );
}

export const InputSimple = observer(InputSimpleComp);
