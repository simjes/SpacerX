import { ResponsiveBullet } from '@nivo/bullet';
import React from 'react';
import styled, { withTheme } from 'styled-components';

const Root = styled.div`
  height: 5rem;
`;

const LaunchBulletChart = ({ launches, theme }) => {
  return (
    <Root>
      <ResponsiveBullet
        data={launches}
        animate={true}
        markerColors={theme.successColor}
        rangeColors='seq:red_blue'
      />
    </Root>
  );
};

export default withTheme(LaunchBulletChart);
