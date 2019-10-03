import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import InlineLink from './index';

storiesOf('Components|InlineLink', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      slots: [{ name: 'Link text' }],
      /* eslint-disable-next-line react/prop-types */
      componentFunction: ({ slotTexts: [linkText] }) => (
        <>
          <InlineLink href="https://www.bbc.com/news">{linkText}</InlineLink>
          <br />
          <br />
          Please note this component does not have its own typography styling
          (font-size, font-family and line-height) as it is expected to be used
          within another component such as paragraph or caption. For a more
          realistic storybook example of this component see the Paragraph and
          Caption stories - this should be removed in
          https://github.com/bbc/psammead/issues/733
        </>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  );
