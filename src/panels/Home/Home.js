import React, { useEffect, useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell';
import axios from 'axios';

const Home = ({ id, fetchedUser, BACKEND_URL }) => {
	const [userScore, setUserScore] = useState(null);
	const [userHistory, setUserHistory] = useState([]);

	useEffect(() => {
		axios.get(BACKEND_URL + '/score' + window.location.search)
			.then(response => {
				if (response.status === 200) {
					setUserScore(response.data.data.score);
				}
			})
		axios.get(BACKEND_URL + '/history' + window.location.search, {
			params: {
				user_id: 95442188,
			}
		})
			.then(response => {
				if (response.status === 200) {
					setUserHistory(response.data.data);
				}
			})
	}, []);

	const historyList = () => {
		return userHistory.map(item => (
			<RichCell
				caption=""
				after={`+ ${item.score}`}
			>
				{item.activity_title}
			</RichCell>
		));
	}

	return (
		<Panel id={id}>
			<PanelHeader>Главный экран</PanelHeader>
			{fetchedUser &&
			<Group title="User Data Fetched with VK Bridge">
				<Cell
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={`Баланс: ${userScore ? userScore : 0}`}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</Cell>
			</Group>}

			<Group header={<Header mode="secondary">История начислений</Header>}>
				{historyList()}
			</Group>
		</Panel>
	);
};

export default Home;
