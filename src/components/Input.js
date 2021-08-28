/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const Input = ({ setLoading }) => {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState(null);
	const [errorText, setErrorText] = useState('');

	const API = process.env.REACT_APP_API_URL;

	const saveOnPressEnter = (e) => {
		if (e.key === 'Enter') {
			postTodo();
		}
	};
	const postTodo = async () => {
		if (inputValue !== '') {
			setLoading(true);
			try {
				await axios.post(`${API}/todo`, { todo: inputValue.trim() });
				setInputValue('');
				setErrorText('');
				setError(false);
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
				setErrorText('Already in the list');
			}
		}
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
		setError(false);
		setErrorText('');
	};

	return (
		<div className='input-field'>
			<TextField
				error={error}
				helperText={errorText}
				id='standard-basic'
				label='Enter here ...'
				type='text'
				value={inputValue}
				onKeyPress={saveOnPressEnter}
				onChange={handleChange}
			/>
			<Fab size='small' color='primary' onClick={postTodo}>
				<AddIcon />
			</Fab>
		</div>
	);
};

export default Input;
