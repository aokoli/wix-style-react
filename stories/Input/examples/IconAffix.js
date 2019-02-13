import React from 'react';

import { Cell, Layout } from '../../../src';
import LiveCodeExample from '../../utils/Components/LiveCodeExample';
import { Section } from '../../UXStoryTemplate';

export default () => {
  return (
    <Section title="Icon Affix">
      <Layout>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Icon prefix"
            initialCode={
              '<Input prefix={<Input.IconAffix><Date /></Input.IconAffix>} />'
            }
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Icon suffix"
            initialCode={
              '<Input suffix={<Input.IconAffix><Search /></Input.IconAffix>} />'
            }
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Icon prefix & suffix"
            initialCode={`<Input prefix={<Input.IconAffix><Date /></Input.IconAffix>} 
                                 suffix={<Input.IconAffix><Search /></Input.IconAffix>} />`}
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Icon prefix & suffix with error"
            initialCode={`<Input prefix={<Input.IconAffix><Date /></Input.IconAffix>} 
                                 suffix={<Input.IconAffix><Search /></Input.IconAffix>} 
                                 status="error" />`}
          />
        </Cell>
      </Layout>
    </Section>
  );
};
