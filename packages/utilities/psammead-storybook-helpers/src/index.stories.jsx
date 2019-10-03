import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import notes from '../README.md';
import { inputProvider, dirDecorator } from '.';

storiesOf('Utilities|Input Provider', module)
  .addDecorator(withKnobs)
  .add(
    'simple',
    inputProvider({
      componentFunction: () => <span>I toggle dir based on language</span>,
    }),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'simple - limited services',
    inputProvider({
      componentFunction: () => (
        <span>Im only availible in news, pidgin & thai</span>
      ),
      services: ['news', 'pidgin', 'thai'],
    }),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'complex',
    inputProvider({
      slots: [
        {
          name: 'first slot',
          defaultText:
            "this slot overwrites the news default; the next one doesn't",
        },
        { name: 'second slot' },
      ],
      /* eslint-disable react/prop-types */
      componentFunction: ({
        slotTexts: [first, second],
        script,
        dir,
        service,
      }) => (
        <ul>
          <li>{first}</li>
          <li>{second}</li>
          <li>{service}</li>
          <li>Selected direction: {dir}</li>
          <li>
            Content of selected script:
            <pre>{JSON.stringify(script, null, ' ')}</pre>
          </li>
        </ul>
      ),
    }),
    { notes, knobs: { escapeHTML: false } },
  );

storiesOf('Utilities|Input Provider', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add(
    'with dirDecorator',
    () => <span> I toogle dir based on language using dirDecorator</span>,
    { notes },
  );
