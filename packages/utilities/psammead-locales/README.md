# psammead-locales - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fpsammead-locales%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fpsammead-locales%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-locales)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-locales) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-locales)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-locales&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-locales.svg)](https://www.npmjs.com/package/@bbc/psammead-locales) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a collection of locale configs, used in BBC World Service sites.

## Exports

### Moment locales

The following [Moment.js](https://momentjs.com/) locales have been added as they do not exist upstream:

- `/moment/am` - locale override for Amharic
- `/moment/ha` - locale for Hausa
- `/moment/ig` - locale for Igbo
- `/moment/om` - locale override for Afaan Oromoo
- `/moment/pcm` - locale for Pidgin
- `/moment/ps` - locale for Pashto
- `/moment/rw` - locale for Gahuza
- `/moment/so` - locale for Somali
- `/moment/ti` - locale for Tigrinya

The following locales have overrides to meet BBC World Service requirements where these differ from the upstream locale. Note that importing them will also cause the upstream locale to be loaded.

- `/moment/ar` - locale override for Arabic
- `/moment/az` - locale override for Azeri
- `/moment/bn` - locale override for Bengali
- `/moment/es` - locale override for Spanish (Mundo)
- `/moment/fa` - locale override for Persian (Farsi)
- `/moment/gu` - locale override for Gujarati
- `/moment/hi` - locale override for Hindi
- `/moment/ky` - locale override for Kyrgyz
- `/moment/mr` - locale override for Marathi
- `/moment/ne` - locale override for Nepali
- `/moment/pa-in` - locale override for Punjabi
- `/moment/pt-br` - locale override for Brasil
- `/moment/ru` - locale override for Russian
- `/moment/si` - locale override for Sinhala
- `/moment/sr` - locale override for Serbian
- `/moment/sr-cyrl` - locale override for Serbian Cyrillic
- `/moment/sw` - locale override for Swahili
- `/moment/ta` - locale override for Tamil
- `/moment/th` - locale override for Thai
- `/moment/uk` - locale override for Ukrainian
- `/moment/ur` - locale override for Urdu
- `/moment/uz` - locale override for Uzbek
- `/moment/yo` - locale override for Yoruba

### Numerals

`/numerals` - Numerals in several different number systems, e.g. Bengali, Burmese, Eastern Arabic, Western Arabic. This can be used for localised numbers for components. Returns arrays of the format `['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];`

## Installation

```jsx
npm install @bbc/psammead-locales --save
```

## Usage

### Moment locales

```jsx
import moment from 'moment';
import '@bbc/psammead-locales/moment/ig';

moment.locale('ig');
```

### Numerals

```jsx
import { Bengali } from '@bbc/psammead-locales/numerals';
```

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
