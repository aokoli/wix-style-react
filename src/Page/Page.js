import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ResizeSensor } from 'css-element-queries';
import { allValidators, extendPropTypes } from '../utils/propTypes';
import s from './Page.scss';
import WixComponent from '../BaseComponents/WixComponent';
import { PageContext } from './PageContext';
import PageHeader from '../PageHeader';
import Content from './Content';
import Tail from './Tail';

import { PageSticky } from './PageSticky';

import {
  SCROLL_TOP_THRESHOLD,
  SHORT_SCROLL_TOP_THRESHOLD,
  PAGE_SIDE_PADDING_PX,
  PAGE_BOTTOM_PADDING_PX,
} from './constants';
import {
  mainContainerMinWidthPx as GRID_MIN_WIDTH,
  mainContainerMaxWidthPx as GRID_MAX_WIDTH,
} from '../Grid/constants';
import deprecationLog from '../utils/deprecationLog';

/*
 * Page structure is as follows:
 *
 * + PageWrapper --------------
 * | +- Page --------------------
 * | | +-- FixedContainer ---------
 * | | | +-- HeaderContainer ------ (Minimizable)
 * | | | |  header-content:padding-top
 * | | | | +-- Page.Header --------
 * | | | | |
 * | | | | |
 * | | | | +-----------------------
 * | | | |  tail:padding-top
 * | | | | +-- Page.Tail ----------
 * | | | | |
 * | | | | |
 * | | | | +-----------------------
 * | | | |  header-content:padding-bottom
 * | | | +-------------------------
 * | | | +-- Page.FixedContent* ----- ==+ Content (Virtual)
 * | | | |                              |
 * | | | +---------------------------   |
 * | | +-----------------------------   |
 * | | +--  ScrollableContainer -----   |
 * | | | +-- contentWrapper----------   |
 * | | | | +-- Page.FixedContent* ---   |
 * | | | | |                            |
 * | | | | +-------------------------   |
 * | | | | +-- Page.Content ---------   |
 * | | | | |                            |
 * | | | | +-------------------------   |
 * | | | +---------------------------   |
 * | | +----------------------------- ==+
 * | +----------------------------- (Page - End)
 * +------------------------------- (PageWrapper - End)
 *
 * -  ScrollableContainer is called in the code scrollable-content, and should NOT be renamed, since
 * Tooltip is hard-coded-ly using a selector like this: [data-class="page-scrollable-content"]
 * - * Page.FixedContent - is In contentWrapper, but when it gets sticky, it moves to the
 */

/**
 * A page container which contains a header and scrollable content
 */
class Page extends WixComponent {
  static defaultProps = {
    gradientCoverTail: true,
    minWidth: GRID_MIN_WIDTH,
    maxWidth: GRID_MAX_WIDTH,
  };

  constructor(props) {
    super(props);

    this._setContainerScrollTopThreshold(false);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleWidthResize = this._handleWidthResize.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
    this._renderFixedContent = this._renderFixedContent.bind(this);

    this.state = {
      headerContainerHeight: 0,
      tailHeight: 0,
      scrollBarWidth: 0,
      displayMiniHeader: false,
      minimizedHeaderContainerHeight: null,
      isStickyFixedContent: false,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.contentResizeListener = new ResizeSensor(
      this._getScrollContainer().childNodes[0],
      this._handleWidthResize,
    );
    this._calculateComponentsHeights();
    this._handleWidthResize();
    window.addEventListener('resize', this._handleWindowResize);
  }

  componentDidUpdate(prevProps) {
    // TODO: add watch on window.innerHeight - should

    super.componentDidUpdate(prevProps);
    this._calculateComponentsHeights();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.contentResizeListener.detach(this._handleWidthResize);
    window.removeEventListener('resize', this._handleWindowResize);
  }

  _calculateComponentsHeights() {
    const {
      headerContainerHeight,
      minimizedHeaderContainerHeight,
      tailHeight,
      pageHeight,
    } = this.state;

    const newHeaderContainerHeight = this.headerContainerRef
      ? this.headerContainerRef.getBoundingClientRect().height
      : 0;

    const newMinimizedHeaderContainerHeight = this.minimizedHeaderContainerRef
      ? this.minimizedHeaderContainerRef.getBoundingClientRect().height
      : 0;
    const newTailHeight = this.pageHeaderTailRef
      ? this.pageHeaderTailRef.offsetHeight
      : 0;
    const newPageHeight = this.pageRef ? this.pageRef.offsetHeight : 0;
    if (
      headerContainerHeight !== newHeaderContainerHeight ||
      minimizedHeaderContainerHeight !== newMinimizedHeaderContainerHeight ||
      tailHeight !== newTailHeight ||
      pageHeight !== newPageHeight
    ) {
      this.setState({
        headerContainerHeight: newHeaderContainerHeight,
        minimizedHeaderContainerHeight: newMinimizedHeaderContainerHeight,
        tailHeight: newTailHeight,
        pageHeight: newPageHeight,
      });
    }
  }

  _setContainerScrollTopThreshold({ shortThreshold }) {
    this.containerScrollTopThreshold = shortThreshold
      ? SHORT_SCROLL_TOP_THRESHOLD
      : SCROLL_TOP_THRESHOLD;
  }

  _setScrollContainer(scrollableContainerRef) {
    this.scrollableContentRef = scrollableContainerRef;

    this.props.scrollableContentRef &&
      this.props.scrollableContentRef(scrollableContainerRef);
  }

  _getScrollContainer() {
    return this.scrollableContentRef;
  }

  _handleScroll() {
    const containerScrollTop = this._getScrollContainer().scrollTop;

    const { displayMiniHeader, minimizedHeaderContainerHeight } = this.state;
    const nextDisplayMiniHeader =
      containerScrollTop >= minimizedHeaderContainerHeight;

    if (displayMiniHeader !== nextDisplayMiniHeader) {
      this.setState({
        displayMiniHeader: nextDisplayMiniHeader,
      });
    }
  }

  _handleWidthResize() {
    // Fixes width issues when scroll bar is present in windows
    const scrollContainer = this._getScrollContainer();
    const scrollBarWidth =
      scrollContainer &&
      scrollContainer.offsetWidth - scrollContainer.clientWidth;

    if (this.state.scrollBarWidth !== scrollBarWidth) {
      this.setState({ scrollBarWidth });
    }
  }

  _handleWindowResize() {
    // TODO: add optimization - render only when height changes
    this.forceUpdate();
  }

  _safeGetChildren(element) {
    if (!element || !element.props || !element.props.children) {
      return [];
    }

    return element.props.children;
  }

  _calculatePageDimensionsStyle() {
    const { maxWidth, sidePadding } = this.props;
    if (!maxWidth && !sidePadding && sidePadding !== 0) {
      return null;
    }

    const styles = {};
    if (maxWidth) {
      styles.maxWidth = `${maxWidth}px`;
    }

    if (sidePadding || sidePadding === 0) {
      styles.paddingLeft = `${sidePadding}px`;
      styles.paddingRight = `${sidePadding}px`;
    }

    return styles;
  }

  /**
   * See diagram in class documentation to better understand this method.
   */
  _calculateHeaderMeasurements() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageTail } = childrenObject;

    const { gradientCoverTail } = this.props;
    const { headerContainerHeight, tailHeight } = this.state;

    const imageHeight = `${headerContainerHeight +
      (PageTail ? -tailHeight : 39)}px`;
    const gradientHeight = gradientCoverTail
      ? `${headerContainerHeight + (PageTail ? -SCROLL_TOP_THRESHOLD : 39)}px`
      : imageHeight;

    return {
      imageHeight,
      gradientHeight,
      headerContainerHeight,
    };
  }

  hasBackgroundImage() {
    return !!this.props.backgroundImageUrl;
  }

  hasGradientClassName() {
    return !!this.props.gradientClassName && !this.props.backgroundImageUrl;
  }

  _getMiniHeaderHeight() {
    return this.minimizedHeaderContainerRef
      ? this.minimizedHeaderContainerRef.getBoundingClientRect().height
      : null;
  }

  _getContentHorizontalLayoutProps() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageContent } = childrenObject;
    const contentFullScreen = PageContent && PageContent.props.fullScreen;
    const pageDimensionsStyle = this._calculatePageDimensionsStyle();

    return {
      className: classNames(s.contentHorizontalLayout, {
        [s.contentFullWidth]: contentFullScreen,
      }),
      style: contentFullScreen ? null : pageDimensionsStyle,
    };
  }

  _renderHeader({ minimized }) {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageTail, PageHeader: PageHeaderChild } = childrenObject;
    const pageDimensionsStyle = this._calculatePageDimensionsStyle();

    return (
      <div
        className={classNames(s.pageHeaderContainer, {
          [s.minimized]: minimized,
        })}
        ref={ref => {
          if (minimized) {
            this.minimizedHeaderContainerRef = ref;
          } else {
            this.headerContainerRef = ref;
          }
        }}
        // style={{ position: 'relative' }}
      >
        {PageHeaderChild && (
          <div className={s.pageHeader} style={pageDimensionsStyle}>
            {React.cloneElement(PageHeaderChild, {
              minimized,
              hasBackgroundImage: this.hasBackgroundImage(),
            })}
          </div>
        )}
        {PageTail && (
          <div
            data-hook="page-tail"
            className={classNames(s.tail, { [s.minimized]: minimized })}
            style={pageDimensionsStyle}
            ref={r => (this.pageHeaderTailRef = r)}
          >
            {React.cloneElement(PageTail, { minimized })}
          </div>
        )}
      </div>
    );
  }

  _renderFixedContainer() {
    const { scrollBarWidth, displayMiniHeader } = this.state;

    return (
      <div
        data-hook="page-fixed-container"
        style={{
          width: scrollBarWidth ? `calc(100% - ${scrollBarWidth}px` : undefined,
          // display: displayMiniHeader ? undefined : 'none',
          visibility: displayMiniHeader ? undefined : 'hidden',
        }}
        className={classNames(s.fixedContainer)}
        onWheel={event => {
          this._getScrollContainer().scrollTop =
            this._getScrollContainer().scrollTop + event.deltaY;
        }}
      >
        {this._renderHeader({ minimized: true })}
      </div>
    );
  }

  _renderScrollableContainer() {
    const { imageHeight, gradientHeight } = this._calculateHeaderMeasurements();
    const {
      minimizedHeaderContainerHeight,
      headerContainerHeight,
    } = this.state;
    return (
      <div
        className={s.scrollableContainer}
        data-hook="page-scrollable-content"
        data-class="page-scrollable-content"
        ref={r => this._setScrollContainer(r)}
        onScroll={this._handleScroll}
      >
        {this._renderScrollableBackground({
          gradientHeight,
          imageHeight,
        })}
        {this._renderHeader({ minimized: false })}
        {this._renderContentWrapper()}
      </div>
    );
  }

  _renderScrollableBackground({ gradientHeight, imageHeight }) {
    if (this.hasBackgroundImage()) {
      return (
        <div
          className={s.imageBackgroundContainer}
          style={{ height: imageHeight }}
          data-hook="page-background-image"
        >
          <div
            className={s.imageBackground}
            style={{ backgroundImage: `url(${this.props.backgroundImageUrl})` }}
          />
        </div>
      );
    }

    if (this.hasGradientClassName()) {
      return (
        <div
          data-hook="page-gradient-class-name"
          className={`${s.gradientBackground} ${this.props.gradientClassName}`}
          style={{ height: gradientHeight }}
        />
      );
    }
  }

  _renderFixedContent() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageFixedContent } = childrenObject;
    const { minimizedHeaderContainerHeight } = this.state;
    return (
      PageFixedContent && (
        <div
          data-hook="page-fixed-content"
          className={classNames(s.fixedContent)}
          style={{ top: `${minimizedHeaderContainerHeight}px` }}
        >
          {React.cloneElement(PageFixedContent)}
        </div>
      )
    );
  }

  _renderContentWrapper() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageContent } = childrenObject;

    const { headerContainerHeight } = this._calculateHeaderMeasurements();

    const { pageHeight, minimizedHeaderContainerHeight } = this.state;

    const contentHorizontalLayoutProps = this._getContentHorizontalLayoutProps();
    const stretchToHeight =
      pageHeight - headerContainerHeight - PAGE_BOTTOM_PADDING_PX;

    return (
      <PageContext.Provider
        value={{
          stickyStyle: {
            top: `${this.state.minimizedHeaderContainerHeight}px`,
          },
        }}
      >
        <div
          className={classNames(contentHorizontalLayoutProps.className, {
            [s.contentWrapper]: this.props.upgrade,
          })}
          style={{
            ...contentHorizontalLayoutProps.style,
          }}
        >
          <div
            style={{
              minHeight: `${stretchToHeight}px`,
            }}
            className={s.contentFloating}
          >
            {this._renderFixedContent()}
            {this._safeGetChildren(PageContent)}
          </div>
        </div>
      </PageContext.Provider>
    );
  }

  render() {
    const { className, children, minWidth, upgrade } = this.props;

    const childrenObject = getChildrenObject(children);
    const { PageTail } = childrenObject;
    this._setContainerScrollTopThreshold({
      shortThreshold: PageTail && this.hasGradientClassName(),
    });

    return (
      <div
        className={classNames(
          upgrade ? s.pageWrapper : s.deprecatedPageWrapper,
          className,
        )}
      >
        <div
          className={upgrade ? s.page : s.deprecatedPage}
          style={{
            minWidth: minWidth + 2 * PAGE_SIDE_PADDING_PX,
          }}
          ref={ref => (this.pageRef = ref)}
        >
          {this._renderFixedContainer()}
          {this._renderScrollableContainer()}
        </div>
      </div>
    );
  }
}

const FixedContent = props => props.children;
FixedContent.displayName = 'Page.FixedContent';
FixedContent.propTypes = {
  children: PropTypes.element.isRequired,
};

Page.displayName = 'Page';
Page.Header = PageHeader;
Page.Content = Content;
Page.FixedContent = FixedContent;
Page.Tail = Tail;
Page.Sticky = PageSticky;

Page.propTypes = {
  /** Background image url of the header beackground */
  backgroundImageUrl: PropTypes.string,
  /** Sets the max width of the content (Both in header and body) NOT including the page padding */
  maxWidth: PropTypes.number,
  /** Sets the min width of the content (Both in header and body) NOT including the page padding */
  minWidth: PropTypes.number,
  /** Sets padding of the sides of the page */
  sidePadding: PropTypes.number,
  /** A css class to be applied to the component's root element */
  className: PropTypes.string,
  /** Header background color class name, allows to add a gradient to the header */
  gradientClassName: PropTypes.string,
  /** If false Gradient will not cover Page.Tail */
  gradientCoverTail: PropTypes.bool,
  /** Is called with the Page's scrollable content ref **/
  scrollableContentRef: PropTypes.func,

  /** Accepts these components as children: `Page.Header`, `Page.Tail`, `Page.Content`, `Page.FixedContent`. Order is insignificant. */
  children: PropTypes.arrayOf((children, key) => {
    const childrenObj = getChildrenObject(children);

    if (!childrenObj.PageHeader) {
      return new Error(`Page: Invalid Prop children, must contain Page.Header`);
    }

    if (!childrenObj.PageContent) {
      return new Error(
        `Page: Invalid Prop children, must contain Page.Content`,
      );
    }

    if (
      children[key].type.displayName !== Page.Header.displayName &&
      children[key].type.displayName !== Page.Content.displayName &&
      children[key].type.displayName !== Page.FixedContent.displayName &&
      children[key].type.displayName !== Page.Tail.displayName
    ) {
      return new Error(
        `Page: Invalid Prop children, unknown child ${children[key].type}`,
      );
    }
  }).isRequired,
  /** When true the page will use height: 100% and not require a parent of `display: flex;flex-flow: column;`. Also Page.Content's may grow using `height: 100%`.*/
  upgrade: PropTypes.bool,
};

extendPropTypes(Page, {
  upgrade: allValidators(PropTypes.bool, (props, propName, componentName) => {
    if (!props[propName]) {
      deprecationLog(
        `
${componentName}: New Layout API ! Please set upgrade=true prop to use new Layout API.
When enabled, the page will use height: 100% and not require a parent of 'display: flex;flex-flow: column;'.
Also Page.Content's may grow using 'height: 100%'. See docs for more info: https://github.com/wix/wix-style-react/blob/master/src/Page/README.MIGRATION.md`,
      );
    }
  }),
});

function getChildrenObject(children) {
  return React.Children.toArray(children).reduce((acc, child) => {
    switch (child.type.displayName) {
      case 'Page.Header': {
        acc.PageHeader = child;
        break;
      }
      case 'Page.Content': {
        acc.PageContent = child;
        break;
      }
      case 'Page.FixedContent': {
        acc.PageFixedContent = child;
        break;
      }
      case 'Page.Tail': {
        acc.PageTail = child;
        break;
      }
      default: {
        break;
      }
    }
    return acc;
  }, {});
}

export default Page;
