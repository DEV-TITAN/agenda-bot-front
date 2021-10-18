import React from 'react';

import backgroundTheme from '../../../assets/photo-theme.jpg';
import { ContainerCard, CardInfor, CardButtons } from './style';

interface CardProps {
  title: string;
  category: string;
  urlImage: string | null;
  children: JSX.Element | JSX.Element[];
}

function Card({ title, category, urlImage, children }: CardProps) {
  return (
    <ContainerCard>
      <>
        <CardInfor>
          <img src={urlImage ?? backgroundTheme} alt="Imagem do Tema" />
          <h6>{title}</h6>
          <p>{category}</p>
        </CardInfor>
        <CardButtons>{children}</CardButtons>
      </>
    </ContainerCard>
  );
}

export default Card;
