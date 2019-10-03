import styled from 'styled-components';
import { node } from 'prop-types';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

export const StoryPromoLi = styled.li.attrs({
  role: 'listitem',
})`
  border-bottom: 0.0625rem solid ${C_LUNAR};
  padding: ${GEL_SPACING} 0 ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING_TRPL};
  }

  &:first-child {
    padding-top: 0;

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      padding-top: 1rem;
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-top: 1.5rem;
    }
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;

export const StoryPromoUl = styled.ul.attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

StoryPromoUl.propTypes = {
  children: node.isRequired,
};

StoryPromoLi.propTypes = {
  children: node.isRequired,
};
