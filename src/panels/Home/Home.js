import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Icon20StatisticsOutline from '@vkontakte/icons/dist/20/statistics_outline';
import Icon20HomeOutline from '@vkontakte/icons/dist/20/home_outline';
import Icon20GearOutline from '@vkontakte/icons/dist/20/gear_outline';

const Home = ({ id, fetchedUser, changePanel, ROUTES }) => (
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

		<FixedLayout vertical="bottom">
			<Div className='tab-navigator'>
				<Button mode='tertiary' onClick={() => changePanel(ROUTES.RATING)}>
					<Icon20StatisticsOutline
						width='24'
						height='24'
						className='tab-navigator__icon'
					/>
				</Button>
				<Button mode='tertiary' onClick={() => changePanel(ROUTES.HOME)}>
					<Icon20HomeOutline
						width='24'
						height='24'
						className='tab-navigator__icon tab-navigator__icon--active'
					/>
				</Button>
				<Button mode='tertiary' onClick={() => changePanel(ROUTES.SETTINGS)}>
					<Icon20GearOutline
						width='24'
						height='24'
						className='tab-navigator__icon'
					/>
				</Button>
			</Div>
		</FixedLayout>
	</Panel>
);

export default Home;
