import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  table,
  importExample,
  h2,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';
import styles from './examples.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const baseProps = {
  autoRender: false,
  compact: true,
  previewProps: {
    className: styles.livePreview,
  },
};

const code = config =>
  baseCode({ components: { ...baseScope, Link }, ...baseProps, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  sections: [
    description({
      title: 'Description',
      text: `
Text Input is a composition of 2 individual components – &lt;FormField/&gt; and &lt;Input /&gt;.

This composition is used to build various forms.`,
    }),
    table({
      title: 'Included Components',
      rows: [
        [
          <LinkTo kind="Components" story="FormField">
            &lt;FormField/&gt;
          </LinkTo>,
          'Layout component for form elements',
        ],
        [
          <LinkTo kind="Components" story="Input">
            &lt;Input/&gt;
          </LinkTo>,
          'Component that receives data',
        ],
      ],
    }),
    importExample({
      title: 'Import',
      source: examples.importExample,
    }),
    h2({ text: 'Examples' }),
    columns({
      items: [
        description({ title: 'Size', text: 'Text Input supports 3 sizes' }),
        code({ source: examples.sizes }),
      ],
    }),
    columns({
      items: [
        description({
          title: 'Affix',
          text: 'Text Input has additional container in prefix and suffix area',
        }),
        code({ source: examples.affix }),
      ],
    }),
    columns({
      items: [
        description({
          title: 'Char limit',
          text: 'It is allowed to set maximum number of characters',
        }),
        code({ source: examples.charLimit }),
      ],
    }),
    columns({
      items: [
        description({
          title: 'Required Info',
          text: 'You can add an asterisk if the field is required',
        }),
        code({ source: examples.required }),
      ],
    }),
    columns({
      items: [
        description({
          title: 'Position',
          text:
            'Text Input’s label can be position on top, left or can be hidden. Additional properties behave accordingly.',
        }),
        code({ source: examples.position }),
      ],
    }),
  ],
};
