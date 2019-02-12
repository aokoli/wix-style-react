import React from 'react';

import Page from 'wix-style-react/Page';
import Card from 'wix-style-react/Card';
import Button from 'wix-style-react/Button';
import { Add } from 'wix-style-react/new-icons';
import { ExamplePageContainer } from './ExamplePageContainer';

const ExampleStandard = () => (
  <ExamplePageContainer>
    <Page upgrade>
      <Page.Header
        title="Your Product"
        actionsBar={
          <Button withNewIcons prefixIcon={<Add />}>
            New Item
          </Button>
        }
      />

      <Page.Content>
        <Card>
          <Card.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            facilisis molestie magna vitae pellentesque. Ut elementum accumsan
            nibh, ut faucibus velit. Vestibulum at mollis justo. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            Curae; In sapien odio, hendrerit a iaculis ut, venenatis in ligula.
            Vestibulum suscipit egestas augue, nec mattis est mollis et.
            Curabitur id eleifend leo. Fusce tempor efficitur commodo.
          </Card.Content>
        </Card>
      </Page.Content>
    </Page>
  </ExamplePageContainer>
);

export default ExampleStandard;
