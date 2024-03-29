import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.span`
  position: relative;

  &:focus::after,
  &:hover::after {
    position: absolute;
    display: block;
    z-index: 1;
    bottom: 1.5em;
    left: 0;
    max-width: 10em;
    padding: 0.5em 0.75em;
    border: 0.05em solid rgba(255, 255, 255, 1);
    box-shadow: ${props => props.theme.boxShadow};
    content: attr(aria-label);
    background-color: rgba(0, 0, 0, 0.85);
    color: rgba(255, 255, 255, 1);
    font-size: 1.6rem;
    text-transform: capitalize;
  }
  /* TODO: Get colors from theme */
`;

const Emoji = ({ emoji, label }) => {
  return (
    <Root role='img' aria-label={label}>
      {emoji}
    </Root>
  );
};

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Emoji;
