import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import MediaIndicator from '@bbc/psammead-media-indicator';
import { render } from '@testing-library/react';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import StoryPromo, { Headline, Summary, Link, LiveLabel } from './index';
import relatedItems from '../testHelpers/relatedItems';
import IndexAlsosContainer from '../testHelpers/IndexAlsosContainer';

const Image = <img src="https://foobar.com/image.png" alt="Alt text" />;

/* eslint-disable-next-line react/prop-types */
const LiveComponent = ({ headline, service }) => (
  /* eslint-disable-next-line jsx-a11y/aria-role */
  <span role="text">
    <LiveLabel service={service}>LIVE</LiveLabel>
    <VisuallyHiddenText lang="en-GB">Live, </VisuallyHiddenText>
    {headline}
  </span>
);

// eslint-disable-next-line react/prop-types
const Info = ({ topStory, isLive, alsoItems }) => (
  <>
    <Headline script={latin} topStory={topStory} service="news">
      <Link href="https://www.bbc.co.uk/news">
        {isLive ? (
          <LiveComponent headline="The live promo headline" service="news" />
        ) : (
          'The headline of the promo'
        )}
      </Link>
    </Headline>
    <Summary script={latin} topStory={topStory} service="news">
      The summary of the promo
    </Summary>
    <time>12 March 2019</time>
    {topStory && alsoItems && (
      <IndexAlsosContainer
        alsoItems={alsoItems}
        script={latin}
        service="news"
      />
    )}
  </>
);

const mediaInfo = (
  <MediaIndicator duration="2:15" datetime="PT2M15S" service="news" />
);

describe('StoryPromo', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromo
      image={Image}
      info={Info({ topStory: false })}
      sectionName="section-name"
    />,
  );
  shouldMatchSnapshot(
    'should render Live promo correctly',
    <StoryPromo image={Image} info={Info({ topStory: false, isLive: true })} />,
  );
});

describe('StoryPromo with Media Indicator', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromo
      image={Image}
      info={Info({ topStory: false })}
      mediaIndicator={mediaInfo}
    />,
  );
});

describe('StoryPromo - Top Story', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <StoryPromo image={Image} info={Info({ topStory: true })} topStory />,
  );

  shouldMatchSnapshot(
    'should render with Media Indicator correctly',
    <StoryPromo
      image={Image}
      info={Info({ topStory: true })}
      mediaIndicator={mediaInfo}
      topStory
    />,
  );

  shouldMatchSnapshot(
    'should render with multiple Index Alsos correctly',
    <StoryPromo
      image={Image}
      info={Info({ topStory: true, alsoItems: relatedItems })}
      topStory
    />,
  );

  shouldMatchSnapshot(
    'should render with one Index Also correctly',
    <StoryPromo
      image={Image}
      info={Info({ topStory: true, alsoItems: [relatedItems[0]] })}
      topStory
    />,
  );
});

describe('assertions', () => {
  it('should render h3, a, p, time', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ topStory: true })}
        mediaIndicator={mediaInfo}
      />,
    );

    expect(container.querySelector('h3 a').textContent).toEqual(
      'The headline of the promo',
    );
    expect(container.querySelector('p').textContent).toEqual(
      'The summary of the promo',
    );

    const time = container.querySelector('time');
    expect(time.textContent).toEqual('2:15');

    const image = container.querySelector('img');

    expect(image.getAttribute('src')).toEqual('https://foobar.com/image.png');
    expect(image.getAttribute('alt')).toEqual('Alt text');
  });

  it('should have data-story-promo attribute when sectionName is provided', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ topStory: true })}
        mediaIndicator={mediaInfo}
        sectionName="section-name"
      />,
    );

    expect(
      container.querySelector('div').getAttribute('data-story-promo'),
    ).toEqual('section-name');
  });

  it('should not have data-story-promo attribute when sectionName is not provided', () => {
    const { container } = render(
      <StoryPromo
        image={Image}
        info={Info({ topStory: true })}
        mediaIndicator={mediaInfo}
      />,
    );

    expect(
      container.querySelector('div').getAttribute('data-story-promo'),
    ).toBeNull();
  });
});
