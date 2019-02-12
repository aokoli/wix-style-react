import { storySettings } from './storySettings';
import { description, table } from 'wix-storybook-utils/Sections';

import Input from 'wix-style-react/Input';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Input,
  componentPath: '../../src/Button/Button.js',

  componentProps: {},

  exampleProps: {},

  sections: [
    description({
      title: 'Description',
      text: `
Text Input is a composition of 2 individual components – &lt;Form Field/&gt; and &lt;Input /&gt;.

This composition is used to build various forms.`,
    }),
    table({
      title: 'Included Components',
      rows: [
        ['&lt;Form Field/&gt;', 'Layout component for form elements'],
        ['&lt;Input /&gt;', 'Component that receives data'],
      ],
    }),
  ],
};
