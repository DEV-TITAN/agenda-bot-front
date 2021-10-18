import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React from 'react';

import { Loading } from '../Loading';
import { ButtonContainer } from './style';

type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'primaryOutline'
  | 'secondaryOutline';

export type ButtonSizes = 'small' | 'medium' | 'large';

interface DefaultButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType: ButtonTypes;
  buttonSize: ButtonSizes;
  icon?: IconDefinition;
  loading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
  onClick?(): void;
  type?: 'button' | 'submit';
}

function ButtonComp({
  loading,
  disabled,
  loadingColor,
  buttonType,
  buttonSize,
  icon: Icon,
  children,
  onClick,
  type,
}: DefaultButtonProps) {
  return (
    <ButtonContainer
      buttonSize={buttonSize}
      buttonType={buttonType}
      loading={loading || undefined}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <Loading color={loadingColor} size={18} />
      ) : (
        <>
          {Icon && <FontAwesomeIcon icon={Icon} />}
          {children}
        </>
      )}
    </ButtonContainer>
  );
}

export const Button = observer(ButtonComp);
