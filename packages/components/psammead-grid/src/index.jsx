import React from 'react';
import { bool, node, number, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_GUTTER_BELOW_600PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_GUTTER_ABOVE_600PX,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const groups = {
  group0: {
    min: null,
    max: GEL_GROUP_0_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_BELOW_400PX,
  },
  group1: {
    min: GEL_GROUP_1_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_1_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_BELOW_400PX,
  },
  group2: {
    min: GEL_GROUP_2_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_2_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
  group3: {
    min: GEL_GROUP_3_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_3_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
  group4: {
    min: GEL_GROUP_4_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_4_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
  group5: {
    min: GEL_GROUP_5_SCREEN_WIDTH_MIN,
    max: null,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
};

const mediaQuery = ({ min, max, styles }) => {
  if (min && max) {
    return `
      @media (min-width: ${min}) and (max-width: ${max}) {
        ${styles}
      }
    `;
  }
  if (min) {
    return `
      @media (min-width: ${min}) {
        ${styles}
      }
    `;
  }
  if (max) {
    return `
      @media (max-width: ${max}) {
        ${styles}
      }
    `;
  }
  return '';
};

const gridMediaQueries = ({
  columns,
  gridStartOffset,
  enableGelGutters,
  enableGelMargins,
}) => {
  const selectedGroups = Object.keys(columns);
  return selectedGroups.map(group =>
    mediaQuery({
      min: groups[group].min,
      max: groups[group].max,
      styles: `
        width: initial;
        grid-template-columns: repeat(${columns[group]}, 1fr);
        grid-column-end: span ${columns[group]};
      ${enableGelGutters ? `grid-column-gap: ${groups[group].gutterSize};` : ``}
      ${enableGelMargins ? `padding: 0 ${groups[group].marginSize};` : ``}
      ${
        gridStartOffset && gridStartOffset[group]
          ? `grid-column-start: ${gridStartOffset[group]};`
          : ``
      }`,
    }),
  );
};

/*
 * 1 We vertically align to the top so that sibling
 *   grid items that are placed side-by-side within a row
 *   have their text and images aligned
 */
const gridFallbacks = css`
  ${({ item, columns, parentColumns }) => {
    if (!item || !parentColumns) {
      return `position: relative;`;
    }
    const selectedGroups = Object.keys(columns);
    return selectedGroups.map(
      group =>
        `
      ${mediaQuery({
        min: groups[group].min,
        max: groups[group].max,
        styles: `
          display: inline-block;
          width: ${(100 * columns[group]) / parentColumns[group]}%;
          vertical-align: top; `,
        /* [1] */
      })}
    `,
    );
  }}
`;

const GridComponent = styled.div`
  ${gridFallbacks}
  @supports (display: grid) {
    ${gridMediaQueries}
    ${({ item }) =>
      item ? `display: block;` : `display: grid; position: initial;`}
  }
`;

const Grid = ({
  children,
  startOffset: gridStartOffset, // alias this prop to prevent it rendering as an element attribute e.g. <div startoffset="[object Object]">
  ...otherProps
}) => {
  const renderChildren = () =>
    React.Children.map(children, child => {
      const isNestedGridComponent = child.type === Grid;

      if (isNestedGridComponent) {
        return React.cloneElement(child, {
          parentColumns: otherProps.columns,
        });
      }
      return child;
    });

  return (
    <GridComponent {...otherProps} gridStartOffset={gridStartOffset}>
      {renderChildren()}
    </GridComponent>
  );
};

Grid.propTypes = {
  children: node.isRequired,
  columns: shape({
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
  enableGelGutters: bool,
  enableGelMargins: bool,
  startOffset: shape({
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  item: bool,
};

Grid.defaultProps = {
  enableGelGutters: false,
  enableGelMargins: false,
  startOffset: {},
  item: false,
};

export default Grid;
