import React from 'react';

import { Cell, Layout } from '../../../src';
import LiveCodeExample from '../../utils/Components/LiveCodeExample';
import createInputExample from './createInputExample';
import { Section } from '../../UXStoryTemplate';

const defaultProps = {
  size: 'normal',
  placeholder: 'They did not know it was impossible, so they did it!',
};

export default () => {
  return (
    <Section title="Sizes">
      <Layout>
        <Cell span={4}>
          <LiveCodeExample
            compact
            title="Small"
            initialCode={createInputExample({ ...defaultProps, size: 'small' })}
          />
        </Cell>
        <Cell span={4}>
          <LiveCodeExample
            compact
            title="Normal"
            initialCode={createInputExample({
              ...defaultProps,
              size: 'normal',
            })}
          />
        </Cell>
        <Cell span={4}>
          <LiveCodeExample
            compact
            title="Large"
            initialCode={createInputExample({ ...defaultProps, size: 'large' })}
          />
        </Cell>
      </Layout>
    </Section>
  );
};
