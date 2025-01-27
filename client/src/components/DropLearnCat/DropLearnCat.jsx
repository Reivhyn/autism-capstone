import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './DropLearnCat.css';

const DropLearnCat = ({ onChange }) => {
    return (
        <FormControl variant="outlined" className="custom-select-field">
            <InputLabel>Category</InputLabel>
            <Select onChange={onChange} label="Category">
                <MenuItem value="math">Math</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="history">History</MenuItem>
                <MenuItem value="language">Language</MenuItem>
            </Select>
        </FormControl>
    );
};

export default DropLearnCat;
