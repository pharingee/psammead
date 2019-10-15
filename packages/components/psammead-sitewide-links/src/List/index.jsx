import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape } from 'prop-types';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { grid } from '@bbc/psammead-styles/detection';

import Link from '../Link';

// Gets the number of grid rows, taking into account the
// first-child in the grid being separate, on its own row.
const getRowCount = (children, columns) =>
  Math.ceil((React.Children.count(children) - 1) / columns) + 1;

const StyledList = styled.ul`
  border-bottom: 1px solid ${C_SHADOW};
  list-style-type: none;
  margin: 0;
  padding: 0 0 ${GEL_SPACING};
  column-count: 3;

  @supports (${grid}) {
    display: grid;
    grid-auto-flow: column;
  }

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    grid-auto-flow: row;
    column-count: 1;
  }
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING};
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(
      ${({ children }) => getRowCount(children, 2)},
      auto
    );
    column-count: 2;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(
      ${({ children }) => getRowCount(children, 3)},
      auto
    );
    column-count: 3;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(
      ${({ children }) => getRowCount(children, 4)},
      auto
    );
    column-count: 3;
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column-gap: ${GEL_SPACING_DBL};
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(
      ${({ children }) => getRowCount(children, 5)},
      auto
    );
    column-count: 3;
  }
  > li:first-child {
    border-bottom: 1px solid ${C_SHADOW};
    padding: ${GEL_SPACING} 0;
    margin-bottom: ${GEL_SPACING};
    grid-column: 1/-1;
    width: 100%;
    column-span: all;
  }
`;

const StyledListItem = styled.li`
  min-width: 50%;
  column-gap: 1rem;
`;

const List = ({ links }) => (
  <StyledList role="list">
    {links.map(link => (
      <StyledListItem key={link.text} role="listitem">
        <Link text={link.text} href={link.href} />
      </StyledListItem>
    ))}
  </StyledList>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

List.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
};

export default List;
