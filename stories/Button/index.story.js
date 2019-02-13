import React from 'react';
import { storySettings } from './storySettings';
import icons from '../utils/icons-for-story';
import {
  tab,
  api,
  liveCode as baseLiveCode,
  playground,
  description,
  importExample,
} from 'wix-storybook-utils/Sections';

import Button from 'wix-style-react/Button';
import testkit from '!raw-loader!./README.TESTKIT.md';

import { baseScope } from '../utils/Components/LiveCodeExample';
import * as examples from './examples';
import styles from './examples.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const baseProps = {
  autoRender: false,
  previewProps: {
    className: styles.livePreview,
  },
};

const liveCode = config =>
  baseLiveCode({ components: { ...baseScope, Link }, ...baseProps, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Button,
  componentPath: '../../src/Button/Button.js',

  componentProps: {
    as: 'button',
    children: 'Button',
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    prefixIcon: icons,
    suffixIcon: icons,
    fullWidth: false,
    disabled: false,
    as: ['button', 'a', 'span', 'div'],
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description({
          text: `🔨 To trigger an operation.`,
        }),

        importExample({
          source: "import Button from 'wix-style-react/Button';",
        }),

        description({
          title: `Primary (Filled Buttons)`,
          text:
            'Use primary buttons to give more prominence to actions in layouts with a lot of varying content.',
        }),

        liveCode({
          source: examples.primary,
        }),

        description({
          title: `Secondary (Ghost Buttons)`,
          text:
            'Secondary button is best used for secondary or tertiary content, since it should not compete with your primary call to action.',
        }),

        liveCode({
          source: examples.secondary,
        }),

        description({
          title: `Sizes`,
          text:
            'Button supports four main sizes: tiny, small,medium, large. Default size is medium',
        }),

        liveCode({
          source: examples.sizes,
        }),

        description({
          title: `Affixes`,
          text:
            'Suffix and prefix icons can be added to a button by setting prefixIcon or suffixIcon props.',
        }),

        liveCode({
          source: examples.affixes,
        }),

        description({
          title: `Loading state`,
          text: `A button can show a loading indicator.`,
        }),

        liveCode({
          source: examples.loading,
        }),

        description({
          title: `Custom rendering`,
          text:
            'Control the rendered HTML tag, or render Button component as another component.',
        }),

        liveCode({
          source: examples.custom,
        }),
      ],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'Testkit',
      sections: [
        description({
          text: testkit,
        }),
      ],
    }),
  ],
};
