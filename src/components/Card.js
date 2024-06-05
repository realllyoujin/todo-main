import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Card as MUICard, CardHeader, CardContent, CardActions, Button, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';

// 카테고리별 색상 매핑 객체
const categoryColors = {
    Task: { primaryColor: "#5D93E1", secondaryColor: "#D6E4FB" },
    Work: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
    Exam: { primaryColor: "#F5A9BC", secondaryColor: "#F5A9BC" },
    Personal: { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
    Other: { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" }
};

// 스타일 설정
const CardTop = styled(Box)(({ theme, color }) => ({
    backgroundColor: color,
    height: '5px'
}));

const CardHeaderStyled = styled(CardHeader)(({ theme, color }) => ({
    backgroundColor: color,
    borderRadius: '10px'
}));

const ButtonStyled = styled(Button)(({ theme, color }) => ({
    color: color
}));

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    // 태스크의 카테고리에 따른 색상 선택
    const taskCategory = taskObj.Category;
    const colors = categoryColors[taskCategory] || { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" };

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = (e) => {
        const updatedTask = { ...taskObj, Completed: e.target.checked };
        updateTask(updatedTask);
    };

    return (
        <MUICard className="card-wrapper mr-5" sx={{ position: 'relative', marginBottom: '20px' }}>
            <CardTop color={colors.primaryColor} />
            <CardContent className="task-holder">
                <CardHeaderStyled
                    title={<span style={{ textDecoration: taskObj.Completed ? 'line-through' : 'none' }}>{taskObj.Name}</span>}
                    color={colors.secondaryColor}
                />
                <Typography variant="body2" component="p" className="mt-3" style={{ textDecoration: taskObj.Completed ? 'line-through' : 'none' }}>
                    {taskObj.Description}
                </Typography>
                <Typography variant="body2" component="p" className="mt-1">
                    <strong>Category:</strong> {taskObj.Category}
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={taskObj.Completed}
                            onChange={handleCheckboxChange}
                            name="completed"
                            color="primary"
                        />
                    }
                    label="Completed"
                />
            </CardContent>
            <CardActions sx={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                <ButtonStyled color={colors.primaryColor} onClick={toggle}>Edit</ButtonStyled>
                <ButtonStyled color={colors.primaryColor} onClick={handleDelete}>Delete</ButtonStyled>
            </CardActions>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MUICard>
    );
};

export default Card;
