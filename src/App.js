import { useState, useEffect } from 'react';
import api from './api/servers';
import CustomCard from './components/custom-card';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get().then(setList);
  }, []);

  const handleAddServerClick = async () => {
    const res = await api.save({ name: 'New Server', cpu: '10 GHz', state: 'running', mem: '1 GB' });
    setList([...list, res]);
  };

  const onDelete = (index) => () => {
    list.splice(index, 1);
    setList([...list]);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 3 }}>
      <h2 style={{ display: 'flex', justifyContent: 'center', my: 2, }}>
        Servers
      </h2>
      {
        list.map((item, index) => (
          <CustomCard key={item.name} {...item} onDelete={onDelete(index)}/>
        ))
      }
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
        <Button onClick={handleAddServerClick}>
          Add Server
        </Button>
      </Box>
    </Container>
  );
}
