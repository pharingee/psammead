import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import { Headline, SubHeading } from './index';

storiesOf('Components|Headline', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      slots: [{ name: 'Headline' }],
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ slotTexts: [headline], script, service }) => (
        <Headline script={script} service={service}>
          {headline}
        </Headline>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  );

storiesOf('Components|SubHeading', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      slots: [{ name: 'SubHeading' }],
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ slotTexts: [subheader], script, service }) => (
        <SubHeading script={script} service={service}>
          {subheader}
        </SubHeading>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with optional ID',
    inputProvider({
      slots: [{ name: 'SubHeading' }],
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ slotTexts: [subheader], script, service }) => {
        const id = text('ID', 'foo', 'Other');
        return (
          <SubHeading id={id} script={script} service={service}>
            {subheader}
          </SubHeading>
        );
      },
    }),
    { notes, knobs: { escapeHTML: false } },
  );
