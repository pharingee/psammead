import React from 'react';
import Helmet from 'react-helmet';
import * as testHelpers from '.';
import * as testHelpersFromSrc from './src/index';
import renderWithHelmet from './src/renderWithHelmet';

const testHelpersExpectedExports = {
  shouldMatchSnapshot: 'function',
  isNull: 'function',
  testUtilityPackages: 'function',
  setWindowValue: 'function',
  resetWindowValue: 'function',
  suppressPropWarnings: 'function',
};

const expectedExports = { testHelpers: testHelpersExpectedExports };

const actualExports = { testHelpers };

const actualExportsFromSrc = { testHelpers: testHelpersFromSrc };

const serializeDomString = domString =>
  domString
    .split('\n')
    .map(line => line.trim())
    .join('')
    .trim();

const ensureErrorWhenMissingExport = testHelperMethod => {
  // missing export in the expected
  const actualWithAll = { utility: { foo: {}, bar: {} } };
  const expectedMissing = { utility: { bar: {} } };

  expect(() => {
    testHelperMethod(actualWithAll, expectedMissing, 'testing');
  }).toThrowError(
    "Missing value 'foo' in the expected export for 'testing/utility'.",
  );

  // missing export in the actual
  const actualMissing = { utility: { foo: {} } };
  const expectedWithAll = { utility: { bar: {}, foo: {} } };

  expect(() => {
    testHelperMethod(actualMissing, expectedWithAll, 'testing');
  }).toThrowError(
    "Missing value 'bar' in the actual export for 'testing/utility'.",
  );
};

const ensureErrorWhenMissingFileDefinition = testHelperMethod => {
  // missing export in the expected
  const actualWithAll = {
    utilityOne: { key: {} },
    utilityTwo: { key: {} },
  };
  const expectedMissing = {
    utilityOne: { key: {} },
  };

  expect(() => {
    testHelperMethod(actualWithAll, expectedMissing, 'testing');
  }).toThrowError(
    "Missing value 'utilityTwo' in the expected utilities for 'testing'.",
  );

  // missing export in the actual
  const actualMissing = {
    utilityOne: { key: {} },
  };
  const expectedWithAll = {
    utilityOne: { key: {} },
    utilityTwo: { key: {} },
  };

  expect(() => {
    testHelperMethod(actualMissing, expectedWithAll, 'testing');
  }).toThrowError(
    "Missing value 'utilityTwo' in the actual utilities for 'testing'.",
  );
};

describe('Psammead test helpers', () => {
  it('should test all the utility exports exist and are the correct type', () => {
    testHelpers.testUtilityPackages(
      actualExports,
      expectedExports,
      'psammead-test-helpers',
    );
  });

  it('should test all the utility exports exist and are the correct type when coming from src/', () => {
    testHelpers.testUtilityPackages(
      actualExportsFromSrc,
      expectedExports,
      'psammead-test-helpers',
    );
  });

  it('should error if expectedExport is missing an export compared to the actual export', () => {
    ensureErrorWhenMissingExport(testHelpers.testUtilityPackages);
  });

  it('should error if expectedExport is missing an export compared to the actual export when coming from /src', () => {
    ensureErrorWhenMissingExport(testHelpersFromSrc.testUtilityPackages);
  });

  it('should error if file definition is missing in the expectation', () => {
    ensureErrorWhenMissingFileDefinition(testHelpers.testUtilityPackages);
  });

  it('should error if file definition is missing in the expectation when coming from /src', () => {
    ensureErrorWhenMissingFileDefinition(
      testHelpersFromSrc.testUtilityPackages,
    );
  });

  const NoHelmet = () => (
    <main>
      <h1>Hello I am a test component</h1>
    </main>
  );

  it('should return correct HTML for components not using helmet', async () => {
    const actual = await renderWithHelmet(<NoHelmet />);
    const expected = serializeDomString(`
    <div>
      <main>
        <h1>Hello I am a test component</h1>
      </main>
    </div>
    `);

    expect(actual.container.outerHTML).toEqual(expected);
  });

  testHelpers.shouldMatchSnapshot(
    'should match the snapshot for the test component',
    <NoHelmet />,
  );

  const NoHelmetWithFragment = () => (
    <>
      <h1>Hello I am a test component</h1>
      <p>I am some test text.</p>
    </>
  );

  it('should return correct HTML for components not using helmet and wrapped with fragment', async () => {
    const actual = await renderWithHelmet(<NoHelmetWithFragment />);
    const expected = serializeDomString(`
    <div>
      <h1>Hello I am a test component</h1>
      <p>I am some test text.</p>
    </div>
    `);

    expect(actual.container.outerHTML).toEqual(expected);
  });

  testHelpers.shouldMatchSnapshot(
    'should match the snapshot for the test component',
    <NoHelmetWithFragment />,
  );

  const HelmetOnly = () => (
    <Helmet htmlAttributes={{ dir: 'rtl', lang: 'fa' }}>
      <title>Snapshot with helmet only</title>
      <meta name="test name" content="test content" />
      <script src="test.js" />
    </Helmet>
  );

  it('should return correct HTML for components using helmet only', async () => {
    const actual = await renderWithHelmet(<HelmetOnly />);
    const expected = serializeDomString(`
    <html dir="rtl" lang="fa">
      <head>
        <title>Snapshot with helmet only</title>
        <meta name="test name" content="test content"><script src="test.js"></script>
      </head>
      <body>
        <div></div>
      </body>
    </html>
    `);

    expect(actual.container.outerHTML).toEqual(expected);
  });

  testHelpers.shouldMatchSnapshot(
    'should match the snapshot for the test component with helmet only',
    <HelmetOnly />,
  );

  const HelmetWithContent = () => (
    <>
      <Helmet htmlAttributes={{ dir: 'rtl', lang: 'fa' }}>
        <title>Snapshot with helmet and and other content</title>
        <meta name="test name" content="test content" />
        <script src="test.js" />
      </Helmet>
      <main>
        <h1>Hello I am a test component with React Helmet</h1>
      </main>
    </>
  );

  it('should return correct HTML for components using helmet only with other content', async () => {
    const actual = await renderWithHelmet(<HelmetWithContent />);
    const expected = serializeDomString(`
    <html dir="rtl" lang="fa">
      <head>
        <title>Snapshot with helmet and and other content</title>
        <meta name="test name" content="test content">
        <script src="test.js"></script>
      </head>
      <body>
        <div>
          <main>
            <h1>Hello I am a test component with React Helmet</h1>
          </main>
        </div>
      </body>
    </html>
    `);

    expect(actual.container.outerHTML).toEqual(expected);
  });

  testHelpers.shouldMatchSnapshot(
    'should match the snapshot for the test component with helmet and other content',
    <HelmetWithContent />,
  );
});
