import { LoadingOutlined } from '@ant-design/icons';
import Spin from 'antd/es/spin';
import React from 'react';

import { Colors } from '../../../styles/colors';
import { LoadingContainer } from './style';

interface LoadingProps {
  size?: number;
  color?: string;
}

export function Loading({ size, color }: LoadingProps) {
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: size ?? 24, color: color ?? Colors.WHITE }}
      spin
    />
  );

  return (
    <LoadingContainer>
      <Spin indicator={antIcon} />
    </LoadingContainer>
  );
}
