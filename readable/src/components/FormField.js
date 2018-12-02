import React from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';


function FormField({
  id,
  label,
  help,
  ...props
}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default FormField;
