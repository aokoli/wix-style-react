import React from 'react';

import { Cell, Layout } from '../../../src';
import LiveCodeExample from '../../utils/Components/LiveCodeExample';
import { Section } from '../../UXStoryTemplate';

export default () => {
  return (
    <Section title="Affix">
      <Layout>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Prefix"
            initialCode={
              '<Input prefix={<Input.Affix>https://</Input.Affix>} />'
            }
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Suffix"
            initialCode={'<Input suffix={<Input.Affix>$</Input.Affix>} />'}
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Prefix & suffix"
            initialCode={
              '<Input prefix={<Input.Affix>https://</Input.Affix>} suffix={<Input.Affix>.com</Input.Affix>} />'
            }
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Prefix & suffix with error"
            initialCode={
              '<Input prefix={<Input.Affix>@</Input.Affix>} suffix={<Input.Affix>$</Input.Affix>} status="error" />'
            }
          />
        </Cell>
      </Layout>
    </Section>
  );
};
