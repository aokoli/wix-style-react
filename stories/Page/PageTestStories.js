import React from 'react';
import * as PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Page from 'wix-style-react/Page';
import { getTestStoryKind } from '../storiesHierarchy';

import * as s from './PageTestStories.scss';
import { header, tail, fixedContent, content } from './PageChildren';
import { storySettings } from './storySettings';
import ExampleEmptyState from './ExampleEmptyState';
import { SCROLL_TOP_THRESHOLD } from '../../src/Page/constants';

const PageContainer = props => {
  return (
    <div className={s.pageContainer} {...props}>
      {props.children}
    </div>
  );
};
PageContainer.propTypes = {
  children: PropTypes.any,
};

const kind = getTestStoryKind(storySettings);
const dataHook = 'story-page';

const defaultPageProps = {
  upgrade: true,
  dataHook: dataHook,
  gradientClassName: 'background-gradient',
  children: [header(), content()],
};

const PageTestStories = storiesOf(kind, module);

PageTestStories.add('1. Image', () => (
  <PageContainer>
    <Page
      {...defaultPageProps}
      backgroundImageUrl="https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg"
    />
  </PageContainer>
));

PageTestStories.add('2. Gradient', () => (
  <PageContainer>
    <Page {...defaultPageProps} gradientClassName="background-gradient" />
  </PageContainer>
));

PageTestStories.add('3. FC-Image', () => (
  <PageContainer>
    <Page
      {...defaultPageProps}
      children={[header(), fixedContent, content(false)]}
      backgroundImageUrl="https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg"
    />
  </PageContainer>
));

PageTestStories.add('4. FC-Gradient', () => (
  <PageContainer>
    <Page
      {...defaultPageProps}
      children={[header(), fixedContent, content(false)]}
      gradientClassName="background-gradient"
    />
  </PageContainer>
));

PageTestStories.add('5. HTC-Image', () => (
  <PageContainer>
    <Page
      {...defaultPageProps}
      children={[header(), tail, content(false)]}
      backgroundImageUrl="https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg"
    />
  </PageContainer>
));

PageTestStories.add('6. HTC-Gradient Cover Tail', () => (
  <PageContainer>
    <Page
      {...defaultPageProps}
      children={[header(), tail, content(false)]}
      gradientClassName="background-gradient"
      gradientCoverTail
    />
  </PageContainer>
));

PageTestStories.add('7. Default [min/max]-width', () => (
  <PageContainer>
    <Page {...defaultPageProps} />
  </PageContainer>
));

PageTestStories.add('8. Custom [min/max]-width', () => (
  <PageContainer>
    <Page
      {...defaultPageProps}
      minWidth={504} // With padding: 504 + 48*2 = 600px
      maxWidth={1304} // With padding: 1304 + 48*2 = 1400px
    />
  </PageContainer>
));

PageTestStories.add('9. Empty State', () => (
  <PageContainer>
    <ExampleEmptyState {...defaultPageProps} />
  </PageContainer>
));

PageTestStories.add('10. Page Example with sidePadding=0', () => (
  <PageContainer>
    <Page {...defaultPageProps} sidePadding={0} />
  </PageContainer>
));

/*
 *  Vertical Test Stories
 */

class PageWithScroll extends React.Component {
  state = { fixedContainerHeight: null };
  static pageHeight = 500;
  static pageBottomPadding = 48;
  static headerContainerHeight = 152;
  static minimizedHeaderContainerHeight = 66;

  static propTypes = {
    extraScroll: PropTypes.number,
    contentHeight: PropTypes.number,
    stretchVertically: PropTypes.bool,
    withFixedContent: PropTypes.bool,
  };

  static defaultProps = {
    extraScroll: 0,
  };
  componentDidMount = () => {};

  render() {
    let heightProps;
    const { stretchVertically, contentHeight, withFixedContent } = this.props;

    if (stretchVertically) {
      heightProps = {
        minHeight: 'inherit',
      };
    } else if (contentHeight) {
      heightProps = { height: contentHeight };
    } else {
      const extraScroll = this.props.extraScroll;

      const noScrollHeight =
        PageWithScroll.pageHeight -
        PageWithScroll.headerContainerHeight -
        PageWithScroll.pageBottomPadding;
      heightProps = { height: noScrollHeight + extraScroll };
    }

    return (
      <PageContainer style={{ height: `${this.pageHeight}px` }}>
        <Page {...defaultPageProps} ref={ref => (this.pageInstance = ref)}>
          {header()}
          {withFixedContent && fixedContent}
          <Page.Content>
            <div
              ref={ref => (this.contentRef = ref)}
              style={{
                backgroundColor: 'white',
                ...heightProps,
              }}
            />
          </Page.Content>
        </Page>
      </PageContainer>
    );
  }
}

[false, true].forEach(withFixedContent => {
  const Stories = storiesOf(
    `${kind}/Scroll${withFixedContent ? '_FC' : ''}`,
    module,
  );

  const prefix = testNumber => `${testNumber}. `;
  // withFixedContent ? `2${testNumber}. FC - ` : `1${testNumber}. `;
  const defaultProps = withFixedContent ? { withFixedContent } : {};

  Stories.add(`${prefix(1)}Short Content`, () => (
    <PageWithScroll {...defaultProps} contentHeight={200} />
  ));

  Stories.add(`${prefix(2)}Stretch Vertically`, () => (
    <PageWithScroll {...defaultProps} stretchVertically />
  ));

  Stories.add(`${prefix(3)}Max Height No Scroll`, () => (
    // Small scroll - lower than the threshold that triggers minimization
    <PageWithScroll {...defaultProps} extraScroll={0} />
  ));

  Stories.add(`${prefix(4)}Scroll - No Mini Header`, () => (
    // Small scroll - lower than the threshold that triggers minimization
    <PageWithScroll {...defaultProps} extraScroll={SCROLL_TOP_THRESHOLD - 2} />
  ));

  Stories.add(`${prefix(5)}Scroll - Trigger Mini Header`, () => {
    const scrollAmountForMiniHeader =
      PageWithScroll.headerContainerHeight -
      PageWithScroll.minimizedHeaderContainerHeight;
    return (
      // Small scroll - lower than the threshold that triggers minimization
      <PageWithScroll
        {...defaultProps}
        extraScroll={scrollAmountForMiniHeader}
      />
    );
  });

  Stories.add(`${prefix(6)}Long`, () => {
    const arbitraryLong = PageWithScroll.pageHeight;
    return (
      // Small scroll - lower than the threshold that triggers minimization
      <PageWithScroll {...defaultProps} extraScroll={arbitraryLong} />
    );
  });
});
