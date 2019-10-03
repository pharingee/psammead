# psammead-storybook-helpers - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fpsammead-storybook-helpers%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fpsammead-storybook-helpers%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-storybook-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-storybook-helpers) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a collection of common values that are used in storybook by the Psammead components.

## Exports

`LANGUAGE_VARIANTS` - A list of text samples in different languages, with the script and direction that should be used for that language.

`inputProvider` - A function that provides support for previewing components in storybook in different languages. Takes 1 argument of an object, with these possible keys: `slots`, `componentFunction`, `services` and `options`. Sets the `dir` attribute on the `<html>` element in the story iframe using [Helmet](https://www.npmjs.com/package/react-helmet). Returns the return value of `componentFunction`. This should usually be a React Component.

- `slots`: Array of `slot`s. Optional.
  - `slot`: Object containing configuration for this slot.
    - `name`: String uniquely identifying this slot in the story. Required.
    - `defaultText`: String to use when the story is showing English text. Optional.
- `componentFunction`: `function({slotTexts, script, dir, service})` Required.
  - `slotTexts`: Array of strings to insert into the story. Length and order corresponds to the provided `slots`.
  - `script`: A [script](https://github.com/bbc/psammead/tree/latest/packages/utilities/gel-foundations#script-support) corresponding to the service selected by the storybook user.
  - `dir`: Either `'ltr'` or `'rtl'`, corresponding to the language currently selected by the storybook user.
  - `service`: The service selected by the storybook user.
- `services`: Array of services to filter LANGUAGE_VARIANT's provided into a smaller subset. Optional.
- `options`: Object containing additional context for the input provider. Optional.
  - `defaultService`: String to set the default for the select knob in storybook.

`dirDecorator` - A storybook decorator function that uses `inputProvider` internally to provide direction control. It calls the storybook function with an object containing `dir`, `script` and the `service` name.

## Installation

```sh
npm install @bbc/psammead-storybook-helpers --save-dev
```

## Usage

### LANGUAGE_VARIANTS

<!-- prettier-ignore -->
```jsx
import { select } from '@storybook/addon-knobs';
import { LANGUAGE_VARIANTS } from '@bbc/psammead-storybook-helpers';

const label = 'Languages';
const defaultValue = 'This is a caption';
const groupIdentifier = 'CAPTION VARIANTS';

<Caption>
  {select(label, LANGUAGE_VARIANTS, LANGUAGE_VARIANTS.news, groupIdentifier).text}
</Caption>;
```

### inputProvider

```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import Caption from '@bbc/psammead-caption';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';

storiesOf('Caption', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      slots: [
        { name: 'caption', defaultText: 'Students sitting an examination' },
        { name: 'offscreen text', defaultText: 'Image Caption, ' },
      ],
      componentFunction: ({ slotTexts: [captionText, offscreenText], script, dir, service }) => (
        <Caption script={script} dir={dir} service={service}>
          <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>
          {captionText}
        </Caption>
      ),
      ['news', 'persian', 'igbo']
    }),
    { knobs: { escapeHTML: false } },
  );
```

### dirDecorator

```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';

storiesOf('Example', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add('default', ({ dir, service }) => (
    <h1 dir={dir}>Lorem Ipsum ${service}</h1>
  ));
```

## Contributing

When **adding** a new export to this utility package the [export tests](https://github.com/bbc/psammead/blob/dab14a2732cfa620e083b7da66a148b4189474a7/packages/utilities/psammead-storybook-helpers/index.test.jsx#L13-L15) also need to be updated. When **removing** an exisiting export from this utility package the [export tests](https://github.com/bbc/psammead/blob/dab14a2732cfa620e083b7da66a148b4189474a7/packages/utilities/psammead-storybook-helpers/index.test.jsx#L13-L15) need to be updated and the package version requires a major change (EG: 1.2.1 -> 2.0.0) as this would be considered a breaking change due to functionality being removed.

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
