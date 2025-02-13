import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import InlineLink from '@bbc/psammead-inline-link';
import notes from '../README.md';
import Paragraph from './index';

storiesOf('Components|Paragraph', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      [{ name: 'Paragraph' }],
      ({ slotTexts: [paragraph], script, service }) => (
        <Paragraph script={script} service={service}>
          {paragraph}
        </Paragraph>
      ),
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'containing an inline link',
    inputProvider(
      [{ name: 'Paragraph' }, { name: 'Inline link' }],
      ({ slotTexts: [paragraph, linkText], script, service }) => (
        <Paragraph script={script} service={service}>
          {`${paragraph} `}
          <InlineLink href="https://www.bbc.com">{linkText}</InlineLink>
          {` ${paragraph}`}
        </Paragraph>
      ),
    ),
    { notes, knobs: { escapeHTML: false } },
  );
