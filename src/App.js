import React, { useState, useEffect, Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import Icon20StatisticsOutline from '@vkontakte/icons/dist/20/statistics_outline';
import Icon20GearOutline from '@vkontakte/icons/dist/20/gear_outline';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';

import Home from './panels/Home/';
import Welcome from './panels/Welcome/';
import Rating from './panels/Rating/';
import Settings from './panels/Settings/';
import Loading from './panels/Loading/';

const ROUTES = {
	WELCOME: 'welcome',
	HOME: 'home',
	RATING: 'rating',
	SETTINGS: 'settings',
	LOADING: 'loading',
}

const STORAGE_KEYS = {
	STATUS: 'status',
}

const BACKEND_URL = 'https://8433c42d99224354aa57dea03e9fcd2e.apig.ru-moscow-1.hc.sbercloud.ru/backend/api';

const App = () => {
	const [activeView, setActiveView] = useState(ROUTES.LOADING);
	const [fetchedUser, setUser] = useState(null);

	useEffect(() => {
		function setAppTheme() {
			bridge.subscribe(({ detail: { type, data }}) => {
				if (type === 'VKWebAppUpdateConfig') {
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
				}
			});
		}
		function authUser() {
			const authData = window.location.search;

			axios.get(BACKEND_URL + authData)
				.then((response) => {
					console.log(response);
				})
				.catch(err => {
					console.error(err);
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
		authUser();
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
							data-story="feed"
							text="Рейтинг"
						>
							<Icon20StatisticsOutline />
						</TabbarItem>
						<TabbarItem
							onClick={() => changeView(ROUTES.HOME)}
							selected={activeView === ROUTES.HOME}
							data-story="services"
							text="Профиль"
						>
							<Icon20UserOutline />
						</TabbarItem>
						<TabbarItem
							onClick={() => changeView(ROUTES.SETTINGS)}
							selected={activeView === ROUTES.SETTINGS}
							data-story="messages"
							text="Настройки"
						>
							<Icon20GearOutline />
						</TabbarItem>
					</Tabbar>
				}>
					<View id={ROUTES.RATING} activePanel='rating'>
						<Rating id='rating' />
					</View>
					<View id={ROUTES.HOME} activePanel='home'>
						<Home id='home' fetchedUser={fetchedUser} />
					</View>
					<View id={ROUTES.SETTINGS} activePanel='settings'>
						<Settings id='settings' />
					</View>
				</Epic>
			)}
		</Fragment>
	);
}

export default App;

