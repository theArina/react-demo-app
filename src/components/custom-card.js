import { useState } from 'react';
import api from '../api/servers';
import FieldsList from './fields-list';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function CustomCard(props) {
  const { name, uuid } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [mem, setMem] = useState(props.mem);
  const [state, setState] = useState(props.state);
  const [cpu, setCpu] = useState(props.cpu);

  const serverProps = {
    cpu: {
      name: 'CPU',
      value: cpu,
      set: setCpu,
    },
    state: {
      name: 'State',
      value: state,
      set: setState,
    },
    mem: {
      name: 'Memory',
      value: mem,
      set: setMem,
    },
  };

  const handleInputChange = (prop) => (event) => {
    serverProps[prop].set(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await api.edit(uuid, { name, cpu, state, mem });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    await api.remove(uuid);
    props.onDelete();
  };

  return (
    <Card sx={{ my: 2, px: 1 }}>
      <CardHeader
        title={name}
        subheader={uuid}
        action={
          <Box>{
            <Tooltip title="Edit">
              <IconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? <DoneIcon/> : <EditIcon/>}
              </IconButton>
            </Tooltip>
          } <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FieldsList serverProps={serverProps} handleInputChange={handleInputChange} isEditing={isEditing}/>
        </Box>
      </CardContent>
    </Card>
  );
}
