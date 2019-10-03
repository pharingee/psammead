/* eslint-disable no-unused-expressions */
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { arrayOf, string } from 'prop-types';

const boxSizing = `/* Box Sizing https://bit.ly/1A91I0J */
    html {
      box-sizing: border-box;
      font-size: 100%;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }`;

const GlobalStyles = createGlobalStyle`
    ${styledNormalize}
    
    ${boxSizing}

    html{
      ${({ fonts }) => fonts || null}
    }
  `;

GlobalStyles.propTypes = {
  fonts: arrayOf(string),
};

GlobalStyles.defaultProps = {
  fonts: null,
};

export default GlobalStyles;
