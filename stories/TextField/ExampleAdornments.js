import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Cell } from 'wix-style-react/Layout';
import Input from 'wix-style-react/Input';
import FormField from 'wix-style-react/FormField';
import Date from 'wix-style-react/new-icons/Date';
import Search from 'wix-style-react/new-icons/Search';

const defaultProps = {
  placeholder: 'Search term',
};

const Example = () => (
  <Layout>
    <Cell>
      <Layout>
        <Cell span="4">
          <FormField label="[Status: Loading] + tooltip">
            <Input
              {...defaultProps}
              status={'loading'}
              statusMessage="I am a message"
            />
            <br />
          </FormField>
        </Cell>
        <Cell span="4">
          <FormField label="[Status: Error] + tooltip">
            <Input
              {...defaultProps}
              status={'error'}
              statusMessage="I am a message"
            />
            <br />
          </FormField>
        </Cell>
      </Layout>
    </Cell>
    <Cell>
      <Layout>
        <Cell span="4">
          <FormField label="Suffix">
            <Input {...defaultProps} suffix={<Input.Affix>$</Input.Affix>} />
            <br />
          </FormField>
        </Cell>
        <Cell span="4">
          <FormField label="Prefix">
            <Input
              {...defaultProps}
              prefix={<Input.Affix>http://</Input.Affix>}
            />
            <br />
          </FormField>
        </Cell>
        <Cell span="4">
          <FormField label="Suffix + [Status: Error]">
            <Input
              {...defaultProps}
              suffix={<Input.Affix>$</Input.Affix>}
              status={'error'}
            />
            <br />
          </FormField>
        </Cell>
      </Layout>
    </Cell>
    <Cell>
      <Layout>
        <Cell span="4">
          <FormField label="Icon [Prefix]">
            <Input
              {...defaultProps}
              prefix={
                <Input.IconAffix>
                  <Date />
                </Input.IconAffix>
              }
            />
            <br />
          </FormField>
        </Cell>
        <Cell span="4">
          <FormField label="Icon [Suffix]">
            <Input
              {...defaultProps}
              suffix={
                <Input.IconAffix>
                  <Search />
                </Input.IconAffix>
              }
            />
            <br />
          </FormField>
        </Cell>
      </Layout>
    </Cell>
  </Layout>
);

Example.propTypes = {
  theme: PropTypes.string,
};

export default Example;
