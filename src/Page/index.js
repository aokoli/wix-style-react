import React from 'react';
import PropTypes from 'prop-types';

import PageDeprecated from './Page.deprecated';
import PageNew from './Page';
import deprecationLog from '../utils/deprecationLog';
import { allValidators } from '../utils/propTypes';

const Page = props => {
  const { upgrade, ...rest } = props;

  return upgrade ? <PageNew {...rest} /> : <PageDeprecated {...rest} />;
};

Page.propTypes = {
  upgrade: allValidators(PropTypes.bool, (props, propName) => {
    if (!props[propName]) {
      deprecationLog(
        `Using "Button" with current API is deprecated. In order to upgrade to the new Button api just use "<Button upgrade/>" and follow "5.1 Button" changed api docs. IMPORTANT! - After upgrading, when you import the react/enzyme "buttonTestkitFactory", you will get an async testkit (all methods are async).`,
      );
    }
  }),
};

Page.displayName = 'Page';
Page.Header = PageNew.Header;
Page.Content = PageNew.Content;
Page.FixedContent = PageNew.FixedContent; // TODO: Add deprecationLog, use Page.Sticky instead
Page.Tail = PageNew.Tail;
Page.Sticky = PageNew.Sticky;

export default Page;
