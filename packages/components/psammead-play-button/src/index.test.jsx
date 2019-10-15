import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import PlayButton from './index';

describe('PlayButton', () => {
  shouldMatchSnapshot(
    'should render video by default',
    <PlayButton service="news" title="Dog chases cat." onClick={() => {}} />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly',
    <PlayButton
      service="news"
      title="Dog chases cat."
      onClick={() => {}}
      duration="2:30"
      durationSpoken="2 minutes 30 seconds"
      datetime="PT2M30S"
      className="foo"
    />,
  );

  shouldMatchSnapshot(
    'should render video correctly without duration details',
    <PlayButton service="news" title="Dog chases cat." onClick={() => {}} />,
  );

  shouldMatchSnapshot(
    'should render audio indicator correctly',
    <PlayButton
      service="news"
      title="Dog barks at cat."
      onClick={() => {}}
      duration="2:30"
      durationSpoken="2 minutes 30 seconds"
      datetime="PT2M30S"
      type="audio"
      className="foo"
    />,
  );

  shouldMatchSnapshot(
    'should render audio correctly without duration details',
    <PlayButton
      service="news"
      title="Dog barks at cat."
      onClick={() => {}}
      type="audio"
    />,
  );
});
