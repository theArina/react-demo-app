import TextField from '@mui/material/TextField';

export default function FieldsList(props) {
  const { serverProps, handleInputChange, isEditing } = props;

  const array = [];
  for (const prop in serverProps) {
    const item = serverProps[prop];
    array.push(
      <TextField
        key={item.name}
        variant="standard"
        size="small"
        autoComplete="off"
        label={item.name}
        value={item.value}
        onChange={handleInputChange(prop)}
        InputProps={{ readOnly: !isEditing }}
      />
    );
  }
  return array;
}
