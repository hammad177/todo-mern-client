/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Input from '../components/Input';
import List from '../components/List';
import Loading from '../components/Loading';

const TodoApp = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);

	const API = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const getTodos = async () => {
			try {
				const todosList = await axios.get(`${API}/todo`);
				setTodos(todosList.data);
			} catch (err) {
				console.log('Error to get todos', err);
			}
		};
		getTodos();
	}, [todos]);

	return (
		<div className='todo-app'>
			<div className='container'>
				<Header />
				<Input setLoading={setLoading} />
				{loading && <Loading />}
				{!todos.length && <div className='todo-svg'></div>}
				<ul>
					{todos &&
						todos.map((val) => {
							return (
								<List
									key={val._id}
									val={val}
									setLoading={setLoading}
								/>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default TodoApp;
