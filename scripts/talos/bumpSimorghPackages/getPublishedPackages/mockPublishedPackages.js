const BUMPED_PACKAGES = {
  '@bbc/psammead-figure': [
    '@bbc/psammead-image  ^1.1.0  →  ^1.3.0',
    '@bbc/psammead-image-placeholder  ^1.1.0  →  ^1.2.1',
  ],
  '@bbc/psammead-story-promo': ['@bbc/psammead-image  ^1.1.0  →  ^1.3.0'],
  '@bbc/psammead-navigation': ['@bbc/psammead-brand  ^4.1.0  →  ^4.2.0'],
  '@bbc/psammead-story-promo-list': [
    '@bbc/psammead-image  ^1.1.0  →  ^1.3.0',
    '@bbc/psammead-story-promo ^1.5.0  →  ^2.1.0',
  ],
};

const PUBLISHED_PACKAGES = {
  '@bbc/psammead-image': '^1.3.0',
  '@bbc/psammead-image-placeholder': '^1.2.1',
  '@bbc/psammead-brand': '^4.2.0',
  '@bbc/psammead-story-promo': '^2.1.0',
};

module.exports = {
  BUMPED_PACKAGES,
  PUBLISHED_PACKAGES,
};
