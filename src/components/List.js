/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { IconButton, TextField } from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

const List = ({ val, setLoading }) => {
	const [editId, setEditId] = useState(null);
	const [editValue, setEditValue] = useState('');
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState('');

	const API = process.env.REACT_APP_API_URL;

	const deleteTodo = async (todoId) => {
		setLoading(true);
		try {
			await axios.delete(`${API}/todo/${todoId}`);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log('Error to delete todo', err);
		}
	};

	const editTodo = async () => {
		try {
			await axios.patch(`${API}/todo/${editId}`, {
				todo: editValue,
			});
			setEditId(null);
			setError(false);
			setErrorText('');
		} catch (err) {
			setError(true);
			setErrorText('Already in the list');
		}
	};

	const editOnPressEnter = (e) => {
		if (e.key === 'Enter') {
			editTodo();
		}
	};

	const cancelEdit = () => {
		setEditId(null);
		setError(false);
		setErrorText('');
	};

	return (
		<>
			<li>
				{editId === val._id ? (
					<>
						<TextField
							error={error}
							helperText={errorText}
							id='standard-basic'
							type='text'
							defaultValue={val.todo}
							onKeyPress={editOnPressEnter}
							onChange={(e) => setEditValue(e.target.value)}
						/>
						<div className='btns'>
							<IconButton size='small' onClick={editTodo}>
								<SaveRoundedIcon color='primary' />
							</IconButton>
							<IconButton size='small' onClick={cancelEdit}>
								<CloseIcon />
							</IconButton>
						</div>
					</>
				) : (
					<>
						<span className='li-txt'>{val.todo}</span>
						<div className='btns'>
							<IconButton
								size='small'
								onClick={() => deleteTodo(val._id)}>
								<DeleteForever color='secondary' />
							</IconButton>
							<IconButton
								size='small'
								onClick={() => setEditId(val._id)}>
								<EditIcon />
							</IconButton>
						</div>
					</>
				)}
			</li>
		</>
	);
};

export default List;
