import React from 'react';
import empty from '../../../assets/empty.png';
import { ContainerEmpty } from './style';

export function Empty() {
  return (
    <ContainerEmpty>
      <img src={empty} alt="tela vazia" />
      <p>Esta área ainda está vazia</p>
    </ContainerEmpty>
  );
}
