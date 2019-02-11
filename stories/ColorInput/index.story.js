import React from 'react';
import { storySettings } from './storySettings';

import { Layout, Cell } from 'wix-style-react/Layout';
import ColorInput from 'wix-style-react/ColorInput';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: ColorInput,
  componentPath: '../../src/ColorInput/ColorInput.js',

  componentProps: setState => ({
    value: '',
    placeholder: 'Please choose a color',
    dataHook: storySettings.dataHook,
    onChange: value => setState({ value }),
    size: 'medium',
    errorMessage: '',
    disabled: false,
  }),

  componentWrapper: ({ component }) => (
    <Layout>
      <Cell span={5}>{component}</Cell>
    </Layout>
  ),

  exampleProps: {
    errorMessage: '',
    size: ['small', 'medium', 'large'],
  },
};
