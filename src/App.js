import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';

import Home from './panels/Home/';
import Welcome from './panels/Welcome/';
import Rating from './panels/Rating/';
import Settings from './panels/Settings/';

import './styles/TabNavigator.css';

const ROUTES = {
	WELCOME: 'welcome',
	HOME: 'home',
	RATING: 'rating',
	SETTINGS: 'settings',
}

const STORAGE_KEYS = {
	STATUS: 'status',
}

const BACKEND_URL = 'https://8433c42d99224354aa57dea03e9fcd2e.apig.ru-moscow-1.hc.sbercloud.ru/backend/api';

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.WELCOME);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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

			storageData.keys.forEach(({ key, value }) => {
				switch (key) {
					case STORAGE_KEYS.STATUS:
						if (value === 'visited') {
							setActivePanel(ROUTES.HOME);
							break;
						}
				}
			})

			setUser(user);
			setPopout(null);
		}
		authUser();
		setAppTheme();
		fetchData();
	}, []);

	const changePanel = (panelName) => {
		setActivePanel(panelName);
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Welcome id={ROUTES.WELCOME} changePanel={changePanel} ROUTES={ROUTES} STORAGE_KEYS={STORAGE_KEYS}/>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} changePanel={changePanel} ROUTES={ROUTES} />
			<Rating id={ROUTES.RATING} changePanel={changePanel} ROUTES={ROUTES} />
			<Settings id={ROUTES.SETTINGS} changePanel={changePanel} ROUTES={ROUTES} />
		</View>
	);
}

export default App;

