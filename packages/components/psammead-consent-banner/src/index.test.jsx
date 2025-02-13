import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import { ConsentBanner, ConsentBannerText } from '.';

const baseProps = {
  title: "We've updated our Privacy and Cookies Policy",
  text: <p>Hello</p>,
  accept: <button type="button">Accept</button>,
  reject: <a href="https://foobar.com">Reject</a>,
  id: 'banner-id',
  script: latin,
  service: 'news',
};

describe('ConsentBanner', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBanner {...baseProps} />,
  );

  describe('with hidden attribute on wrapper', () => {
    const props = {
      hidden: true,
      ...baseProps,
    };

    shouldMatchSnapshot(
      'should correctly render',
      <ConsentBanner {...props} />,
    );
  });
});

describe('ConsentBannerText', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBannerText script={latin} service="news">
      We have made some important changes to our Privacy and Cookies Policy and
      we want you to know what this means for you and your data.
    </ConsentBannerText>,
  );
});
