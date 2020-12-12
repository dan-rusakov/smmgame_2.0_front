import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell';

const Home = ({ id, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Главный экран</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description='Баланс: 5200'
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">История начислений</Header>}>
			<RichCell
				caption="Вчера в 20:30"
				after="+ 700"
			>
				Лайк
			</RichCell>
			<RichCell
				caption="Вчера в 20:30"
				after="+ 1500"
			>
				Репост
			</RichCell>
		</Group>
	</Panel>
);

export default Home;
