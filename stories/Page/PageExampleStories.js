import React from 'react';
import { storiesOf } from '@storybook/react';
import { Category } from '../storiesHierarchy';

import ExampleStandAlone from './ExampleStandAlone';
import ExampleWithAppStructure from './ExampleWithAppStructure';
import ExampleStretchCard from './ExampleStretchCard';
import ExampleStretchGrid from './ExampleStretchGrid';
import ExampleStretchTable from './ExampleStretchTable';
import ExampleStickyTableWithGap from './ExampleStickyTableWithGap';

const PageExampleStories = storiesOf(
  `${Category.LAYOUT}/2.5 Page Examples`,
  module,
);

PageExampleStories.add('1. StandAlone', () => <ExampleStandAlone />);
PageExampleStories.add('2. Standard', () => <ExampleWithAppStructure />);
PageExampleStories.add('3. Stretched Card', () => <ExampleStretchCard />);
PageExampleStories.add('4. Stretched Grid', () => <ExampleStretchGrid />);
PageExampleStories.add('5. Stretched Table In Page', () => (
  <ExampleStretchTable />
));
PageExampleStories.add('6. Sticky Table With Gap', () => (
  <ExampleStickyTableWithGap />
));
