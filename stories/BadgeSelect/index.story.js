import React from 'react';
import BadgeSelect from 'wix-style-react/BadgeSelect';
import {
  SKIN,
  TYPE,
  SIZE
} from 'wix-ui-backoffice/dist/src/components/Badge/constants';
import { storySettings } from './storySettings';

const options = Object.values(SKIN).map((skin, id) => ({
  id: id.toString(),
  skin,
  text: skin
}));

// Centering the component since the DropdownLayout is centerized and overflows
// the AutoExample container. In eyes test, the overflowed part will be cut off.
const CenterBadgeSelect = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <BadgeSelect {...props} />
  </div>
);

CenterBadgeSelect.displayName = BadgeSelect.displayName;

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: CenterBadgeSelect,
  componentPath: '../../src/BadgeSelect',

  componentProps: setState => ({
    dataHook: storySettings.dataHook,
    options,
    selectedId: '0',
    onSelect: ({ id }) => setState({ selectedId: id }),
    uppercase: true
  }),

  exampleProps: {
    selectedId: options.map(({ id }) => id),
    options: [{ label: 'All badges', value: options }],
    type: Object.keys(TYPE),
    size: Object.keys(SIZE)
  }
};
