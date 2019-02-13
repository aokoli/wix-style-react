export const importExample = `
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input'
`;

export const sizes = `
  <div>
    <FormField label="Field label">
      <Input size="small" placeholder="Placeholder" />
    </FormField>
    <br/>
    <FormField label="Field label">
      <Input size="normal" placeholder="Placeholder" />
    </FormField>
    <br/>
    <FormField label="Field label">
      <Input size="large" placeholder="Placeholder" />
    </FormField>
  </div>
`;

export const affix = `
  <div>
    <FormField label="Field label">
      <Input size="normal" placeholder="Placeholder" prefix="$"/>
      </FormField>
    <br/>
    <FormField label="Field label">
      <Input size="normal" placeholder="Placeholder" suffix="Kg."/>
    </FormField>
  </div>
`;

export const charLimit = `
  <FormField label="Field label">
    {({setCharactersLeft}) =>
      <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder"/>
    }
  </FormField>
`;

export const required = `
  <FormField label="Field label" required>
    <Input size="normal" placeholder="Placeholder" required/>
  </FormField>
`;

export const position = `
  <div>
    <FormField label="Field label" infoContent="Tooltip text" required>
      {({setCharactersLeft}) =>
        <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder" required/>
      }
    </FormField>
    <br/>
    <FormField label="Field label" infoContent="Tooltip text" labelPlacement="left" required>
      {({setCharactersLeft}) =>
        <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder" required/>
      }
    </FormField>
    <br/>
    <FormField label="Field label" infoContent="Tooltip text" labelPlacement="right" required>
      {({setCharactersLeft}) =>
        <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder" required/>
      }
    </FormField>
  </div>
`;
