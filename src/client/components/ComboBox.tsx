import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import allCourses from '../data/allCourses';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      options={allCourses}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Classes" />}
    />
  );
}