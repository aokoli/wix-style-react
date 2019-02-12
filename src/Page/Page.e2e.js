import { eyesItInstance } from '../../test/utils/eyes-it';
import eventually from 'wix-eventually';

import { pageTestkitFactory } from '../../testkit/protractor';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from '../../stories/Page/storySettings';

const { category, storyName } = storySettings;

const testStoryUrl = testName =>
  createTestStoryUrl({ category, storyName, testName });

describe('Page', () => {
  const eyes = eyesItInstance();

  const initTest = async ({ storyUrl, dataHook }) => {
    await browser.get(storyUrl);
    const driver = pageTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Page');
    await scrollToElement(driver.element());
    return driver;
  };

  const runChildrenCombinationTests = initTestConfig => {
    const eyesManual = eyesItInstance({
      enableSnapshotAtBrowserGet: false,
      enableSnapshotAtEnd: false,
    });

    eyesManual.it('should hide title on scroll threshold', async () => {
      const driver = await initTest(initTestConfig);

      await expect(await driver.titleExists()).toBeTruthy();
      await eyesManual.checkWindow('Page title shown');

      await driver.scrollDown();
      await eventually(() => !driver.titleExists());
      await eyesManual.checkWindow('Page title hidden');

      await driver.scrollUp();
      await eventually(() => driver.titleExists());
      await eyesManual.checkWindow('Page title appears');
    });
  };

  describe('Sticky layer', () => {
    it('should NOT see components with z-index when they go under a sticky item', () => {});
  });

  describe('Header + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('1. Image');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });

    describe('With Gradient', () => {
      const storyUrl = testStoryUrl('2. Gradient');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });
  });

  describe('Header + FixedContent + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('3. FC-Image');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });

    describe('With Gradient', () => {
      const storyUrl = testStoryUrl('4. FC-Gradient');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });
  });

  describe('Header + Tail + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('5. HTC-Image');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });

    describe('With gradientCoverTail', () => {
      const storyUrl = testStoryUrl('6. HTC-Gradient Cover Tail');
      runChildrenCombinationTests({
        storyUrl,
        dataHook,
        props: { backgroundImageUrl: '' },
      });
    });
  });

  describe('min/max width', () => {
    function eyesOptions({ width }) {
      return {
        enableSnapshotAtBrowserGet: true,
        enableSnapshotAtEnd: false,
        width,
      };
    }

    describe('Default values', () => {
      const url = testStoryUrl('7. Default [min/max]-width');

      eyes.it(
        'should stop growing at max-width',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 1500 }),
      );

      eyes.it(
        'should stop shrinking at default min-width',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 500 }),
      );
    });

    describe('Custom values', () => {
      const url = testStoryUrl('8. Custom [min/max]-width');
      eyes.it(
        'should stop growing at max-width (1400px)',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 1500 }),
      );

      eyes.it(
        'should stop shrinking at default min-width (600px)',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 500 }),
      );
    });
  });

  eyes.it('should have empty state', async () => {
    await browser.get(testStoryUrl('9. Empty State'));
  });

  eyes.it('should have short content', async () => {
    await browser.get(testStoryUrl('10. Page Example with short content'));
  });

  eyes.it('should have sidePadding=0', async () => {
    await browser.get(testStoryUrl('11. Page Example with sidePadding=0'));
  });

  eyes.it('should have short content stretched vertically', async () => {
    await browser.get(testStoryUrl('12. Page Example with stretchVertically'));
  });
});
