import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #e3e3e3;
  padding: 2rem;
`;

const Tilte = styled.div`
  font-size: 2.6rem;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 1rem;

  div {
    text-align: center;

    &:not(:first-of-type) {
      font-weight: 600;
    }
  }
`;

const Footer = styled.div`
  margin-top: 1rem;
`;

const getStatusSymbol = status => {
  switch (status) {
    case 'active':
      return '🚀';

    case 'retired':
      return '🧓';

    case 'under construction':
      return '👷‍♀️';

    default:
      return '🦄';
  }
};

// TODO: lag generic card som tar inn children
const LandingPadCard = ({
  title,
  status,
  successfulLandings,
  attemptedLandings
}) => {
  const statusIcon = getStatusSymbol(status);

  return (
    <Card>
      <Tilte>{title}</Tilte>

      <Content>
        <div>Landings</div>
        <div>{attemptedLandings} Attempted</div>
        <div>{successfulLandings} Successful</div>
      </Content>

      <Footer>
        <span role='img' aria-label={status}>
          {statusIcon}
        </span>
      </Footer>
    </Card>
  );
};

LandingPadCard.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  successfulLandings: PropTypes.number.isRequired,
  attemptedLandings: PropTypes.number.isRequired
};

export default LandingPadCard;
