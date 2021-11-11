import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors } from '../../../styles/colors';

import {
  ContainerCardHorizontal,
  CardHorizontalInfor,
  Actions,
  Edit,
  Trash,
} from './style';

interface Item {
  title: string;
  content: string | number | null;
}

interface CardHorizontalProps {
  items?: Item[];
  trash(): void;
  edit(): void;
}

function CardHorizontal({ items, trash, edit }: CardHorizontalProps) {
  return (
    <>
      <ContainerCardHorizontal>
        <CardHorizontalInfor>
          {items && (
            <>
              {items.map(item => (
                <div key={item.title}>
                  <p>{item.title}</p>
                  {item.content}
                </div>
              ))}
            </>
          )}
        </CardHorizontalInfor>
        <Actions>
          <Edit type="button" onClick={edit}>
            <FontAwesomeIcon icon={faEdit} color={Colors.WHITE} size="lg" />
          </Edit>
          <Trash className="trash" type="button" onClick={trash}>
            <FontAwesomeIcon icon={faTrash} color={Colors.WHITE} size="lg" />
          </Trash>
        </Actions>
      </ContainerCardHorizontal>
    </>
  );
}

export default CardHorizontal;
