import { eyesItInstance } from '../../test/utils/eyes-it';
import { inputTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { getTestStoryKind, Category } from '../../stories/storiesHierarchy';

describe('Input', () => {
  const eyes = eyesItInstance();

  describe('Story tests', () => {
    const storyUrl = createStoryUrl({
      kind: 'Components',
      story: 'Input',
      withExamples: false,
    });
    const driver = inputTestkitFactory({ dataHook: 'storybook-input' });
    beforeAll(() => browser.get(storyUrl));

    afterEach(() => autoExampleDriver.remount());
    eyes.it('should render input component', async () => {
      await waitForVisibilityOf(
        driver.element(),
        'Cannot find Input component',
      );
      autoExampleDriver.remount();
    });

    eyes.it('should render with correct text', async () => {
      await autoExampleDriver.setProps({ value: 'hello' });
      await waitForVisibilityOf(
        driver.element(),
        'Cannot find Input component',
      );
      expect(await driver.getText()).toEqual('hello');
    });
  });

  describe('Test pages', () => {
    const kind = getTestStoryKind({
      category: Category.COMPONENTS,
      storyName: 'Input',
    });

    const testPageDriver = inputTestkitFactory({ dataHook: 'wsr-input' });
    eyes.it('should render with correct prefix group', async () => {
      const url = createStoryUrl({
        kind,
        story: '1. Input with suffix group',
      });
      await browser.get(url);
      await waitForVisibilityOf(
        testPageDriver.element(),
        'Cannot find Input component',
      );
    });

    eyes.it('should render with correct suffix group', async () => {
      const url = createStoryUrl({
        kind,
        story: '2. Input with prefix group',
      });
      await browser.get(url);
      await waitForVisibilityOf(
        testPageDriver.element(),
        'Cannot find Input component',
      );
    });
  });
});
