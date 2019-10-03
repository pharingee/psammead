import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { inputProvider, dirDecorator } from '@bbc/psammead-storybook-helpers';
import InlineLink from '@bbc/psammead-inline-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import notes from '../README.md';
import Caption from '.';

storiesOf('Components|Caption', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      slots: [{ name: 'Caption' }],
      /* eslint-disable react/prop-types */
      componentFunction: ({ slotTexts: [captionText], script, service }) => (
        <Caption script={script} service={service}>
          {captionText}
        </Caption>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with offscreen text',
    inputProvider({
      slots: [
        { name: 'Visual hidden text', defaultText: 'visually hidden text' },
        { name: 'Caption', defaultText: 'caption' },
      ],
      componentFunction: ({
        slotTexts: [hiddenText, captionText],
        script,
        service,
      }) => (
        <Caption script={script} service={service}>
          <VisuallyHiddenText>{hiddenText}</VisuallyHiddenText>
          {captionText}
        </Caption>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'containing an inline link',
    inputProvider({
      slots: [
        { name: 'Inline link', defaultText: 'inline link' },
        { name: 'Caption', defaultText: 'caption' },
      ],
      componentFunction: ({
        slotTexts: [linkText, captionText],
        script,
        service,
      }) => (
        <Caption script={script} service={service}>
          {`${captionText} `}
          <InlineLink href="https://www.bbc.com">{linkText}</InlineLink>
          {` ${captionText} `}
        </Caption>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  );

storiesOf('Components|Caption', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add(
    'containing italicisation',
    inputProvider({
      componentFunction: ({ script, service }) => (
        <Caption script={script} service={service}>
          Example text with <i>italics</i>
        </Caption>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'containing multiple paragraphs',
    inputProvider({
      componentFunction: ({ script, service }) => (
        <Caption script={script} service={service}>
          <p>Paragraph with padding bottom.</p>
          <p>
            Last paragraph - <i>without padding bottom</i>.
          </p>
        </Caption>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  );
