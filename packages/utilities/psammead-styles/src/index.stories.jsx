import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_FF_REITH_SANS,
  getBodyCopy,
} from '@bbc/gel-foundations/typography';
import { latin } from '@bbc/gel-foundations/scripts';
import { select, withKnobs } from '@storybook/addon-knobs';
import json5 from 'json5';
import notes from '../README.md';
import * as colours from './colours';
import { grid } from './detection';
import * as fonts from './fonts';

const ColourContainer = styled.div`
  padding: ${GEL_SPACING_DBL};
  font-family: ${GEL_FF_REITH_SANS};
`;

const ColourRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${GEL_SPACING_DBL};
`;

const ColourBox = styled.div`
  background: ${props => props.colour};
  color: #000;
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  border-radius: 0.3125rem;
  display: inline-block;
  ${getBodyCopy(latin)};
`;

const ColourValue = styled.div`
  padding-left: ${GEL_SPACING};
  display: inline-block;
  ${getBodyCopy(latin)};
`;

const Detects = styled.li`
  color: red;
  &::after {
    content: ' = NO';
  }

  @supports (${props => props.detector}) {
    color: green;
    &::after {
      content: ' = YES';
    }
  }
`;

const Paragraph = styled.p`
  ${Object.values(fonts).join()}
`;

const camelCase = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
const fontNames = Object.keys(fonts).sort();
const fontStyles = fontNames.map(x => x.substring(2).replace(/_/g, ' '));
const getFontStyles = fontName => {
  const font = fontNames.find(x => x.includes(fontName.replace(/ /g, '_')));
  const fontFace = fonts[font]() || '';
  const fontStyle = fontFace
    .replace(/"/g, '')
    .replace('@font-face', '')
    .replace(/: /g, ':"')
    .replace(/;/g, '",');

  const { fontFamily, fontWeight } = json5.parse(camelCase(fontStyle));
  return { fontFamily, fontWeight };
};

const detectionExamples = ['display: grid', grid];

storiesOf('Utilities|Psammead Styles', module)
  .addDecorator(withKnobs)
  .add(
    'font styles',
    () => {
      const fontName = select('Font Style', fontStyles, fontStyles[0]);
      return (
        <Paragraph style={getFontStyles(fontName)}>
          <span>The quick brown fox jumps over the lazy dog 0123456789</span>
          <br />
          <span>
            نص حكيم له سر قاطع وذو شأن عظيم مكتوب على ثوب أخضر ومغلف بجلد أزرق
          </span>
        </Paragraph>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'colours',
    () => (
      <ColourContainer>
        {Object.keys(colours).map(colour => (
          <ColourRow key={colours[colour]}>
            <ColourBox colour={colours[colour]}>{colours[colour]}</ColourBox>
            <ColourValue>{colour}</ColourValue>
          </ColourRow>
        ))}
      </ColourContainer>
    ),
    { notes },
  )
  .add(
    'CSS feature detection',
    () => (
      <ul>
        {detectionExamples.map(ex => (
          <Detects key={ex} detector={ex}>
            <pre>@supports ({ex})</pre>
          </Detects>
        ))}
      </ul>
    ),
    { notes },
  );
