import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "category") {
            setCategory(value);
        } else if (name === "completed") {
            setCompleted(checked);
        }
    };

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.Category);
        setCompleted(taskObj.Completed);
    }, [taskObj]);

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {};
        tempObj['Name'] = taskName;
        tempObj['Description'] = description;
        tempObj['Category'] = category;
        tempObj['Completed'] = completed;
        updateTask(tempObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className="form-group">
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            value={taskName}
                            onChange={handleChange}
                            name="taskName"
                            margin="dense"
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            value={description}
                            onChange={handleChange}
                            name="description"
                            margin="dense"
                        />
                    </div>
                    <div className="form-group">
                        <Select
                            label="Category"
                            variant="outlined"
                            fullWidth
                            value={category}
                            onChange={handleChange}
                            name="category"
                            margin="dense"
                        >
                            <MenuItem value="Task">Task</MenuItem>
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Exam">Exam</MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={completed}
                                onChange={handleChange}
                                name="completed"
                                color="primary"
                            />
                        }
                        label="Completed"
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;
