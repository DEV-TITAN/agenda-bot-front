/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors } from '../../../styles/colors';
import { ButtonChevron } from './style';

interface NavChevronProps {
  direction: 'right' | 'left';
  disabled?: boolean;
  onClick?(): void;
}

export function Chevron({ direction, disabled, onClick }: NavChevronProps) {
  return (
    <ButtonChevron disabled={disabled} onClick={onClick}>
      {direction === 'left' ? (
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          size="2x"
          color={Colors.BLUE_500}
        />
      ) : (
        <FontAwesomeIcon
          icon={faChevronCircleRight}
          size="2x"
          color={Colors.BLUE_500}
        />
      )}
    </ButtonChevron>
  );
}
