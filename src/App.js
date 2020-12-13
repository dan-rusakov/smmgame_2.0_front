import React, { useState, useEffect, Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import Icon20StatisticsOutline from '@vkontakte/icons/dist/20/statistics_outline';
import Icon20GearOutline from '@vkontakte/icons/dist/20/gear_outline';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';
import Icon16DonateOultine from '@vkontakte/icons/dist/16/donate_oultine';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/';
import Welcome from './panels/Welcome/';
import Rating from './panels/Rating/';
import Settings from './panels/Settings/';
import Loading from './panels/Loading/';
import Achievements from './panels/Achievements/';

const ROUTES = {
	WELCOME: 'welcome',
	HOME: 'home',
	RATING: 'rating',
	SETTINGS: 'settings',
	LOADING: 'loading',
	ACHIEVEMENTS: 'achievements',
}

const STORAGE_KEYS = {
	STATUS: 'status',
}

const BACKEND_URL = 'https://hc3.smmgame.ru/backend/api';

const App = () => {
	const [activeView, setActiveView] = useState(ROUTES.LOADING);
	const [fetchedUser, setUser] = useState(null);

	useEffect(() => {
		// bridge.send('VKWebAppStorageSet', {
		// 	key: STORAGE_KEYS.STATUS,
		// 	value: '',
		// });
		function setAppTheme() {
			bridge.subscribe(({ detail: { type, data }}) => {
				if (type === 'VKWebAppUpdateConfig') {
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
				}
			});
		}
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS),
			});

			setUser(user);
			storageData.keys.forEach(({ key, value }) => {
				switch (key) {
					case STORAGE_KEYS.STATUS:
						if (value === 'visited') {
							setActiveView(ROUTES.HOME);
						} else {
							setActiveView(ROUTES.WELCOME);
						}

						break;
					default:
						setActiveView(ROUTES.WELCOME);
						break;
				}
			});
		}

		setAppTheme();
		fetchData();
	}, []);

	const changeView = (panelName) => {
		setActiveView(panelName);
	}

	return (
		<Fragment>
			{activeView === ROUTES.LOADING && (
				<View id={ROUTES.LOADING} activePanel='loading'>
					<Loading id='loading' />
				</View>
			)}
			{activeView === ROUTES.WELCOME && (
				<View id={ROUTES.SETTINGS} activePanel='welcome'>
					<Welcome id='welcome' changeView={changeView} ROUTES={ROUTES} STORAGE_KEYS={STORAGE_KEYS} />
				</View>
			)}
			{activeView !== ROUTES.WELCOME && activeView !== ROUTES.LOADING && (
				<Epic activeStory={activeView} tabbar={
					<Tabbar>
						<TabbarItem
							onClick={() => changeView(ROUTES.RATING)}
							selected={activeView === ROUTES.RATING}
							text="Рейтинг"
						>
							<Icon20StatisticsOutline />
						</TabbarItem>
						<TabbarItem
							onClick={() => changeView(ROUTES.HOME)}
							selected={activeView === ROUTES.HOME}
							text="Профиль"
						>
							<Icon20UserOutline />
						</TabbarItem>
						<TabbarItem
							onClick={() => changeView(ROUTES.ACHIEVEMENTS)}
							selected={activeView === ROUTES.ACHIEVEMENTS}
							text="Награды"
						>
							<Icon16DonateOultine width='20' height='20' />
						</TabbarItem>
						<TabbarItem
							onClick={() => changeView(ROUTES.SETTINGS)}
							selected={activeView === ROUTES.SETTINGS}
							text="Настройки"
						>
							<Icon20GearOutline />
						</TabbarItem>
					</Tabbar>
				}>
					<View id={ROUTES.ACHIEVEMENTS} activePanel='achievements'>
						<Achievements id='achievements' />
					</View>
					<View id={ROUTES.RATING} activePanel='rating'>
						<Rating id='rating' BACKEND_URL={BACKEND_URL} />
					</View>
					<View id={ROUTES.HOME} activePanel='home'>
						<Home id='home' fetchedUser={fetchedUser} BACKEND_URL={BACKEND_URL} />
					</View>
					<View id={ROUTES.SETTINGS} activePanel='settings'>
						<Settings id='settings' changeView={changeView} BACKEND_URL={BACKEND_URL} ROUTES={ROUTES} />
					</View>
				</Epic>
			)}
		</Fragment>
	);
}

export default App;

