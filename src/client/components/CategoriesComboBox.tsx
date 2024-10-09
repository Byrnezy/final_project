import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import allCourseTypes from '../data/allCourseTypes';

export default function CategoriesComboBox() {
  return (
    <Autocomplete
      disablePortal
      options={allCourseTypes}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categories" />}
    />
  );
}