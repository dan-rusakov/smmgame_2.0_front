import React, { useEffect, useState } from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell';
import axios from 'axios';

const Rating = ({ id, BACKEND_URL }) => {
    const [rating, setRating] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(BACKEND_URL + '/history/group' + window.location.search)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    setHistory(response.data);
                }
            })

        axios.get(BACKEND_URL + '/rates' + window.location.search)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    setRating(response.data);
                }
            })

    }, []);

    const MOCK_USERS = [
        {
            id: 1,
            name: 'Николай Смирнов',
            img: '',
            score_title: 'Лайк',
            score: 300,
        },
        {
            id: 2,
            name: 'Василиса Заулина',
            img: '',
            score_title: 'Комментарий',
            score: 500,
        },
    ];

    const ratingList = () => {
        return rating.map(user => (
            <SimpleCell
                key={user.user_id}
                before={<Avatar size={40} src={''} />}
                after={`+ ${user.total_scores}`}
            >{user.name}</SimpleCell>
        ));
    }

    const historyList = () => {
        return history.map(item => (
            <RichCell
                key={item.id}
                caption={item.user_id}
                after={`+ ${item.score}`}
            >
                {item.activity_type === 'comment' ? 'Комментарий' : 'Лайк'}
            </RichCell>
        ));
    }

    return (
        <Panel id={id}>
            <PanelHeader>Общий рейтинг</PanelHeader>
            <Group header={<Header mode="secondary">Топ 3 пользователей</Header>}>
                {ratingList()}
            </Group>

            <Group header={<Header mode="secondary">Общая история операций</Header>}>
                {historyList()}
            </Group>
        </Panel>
    );
}

export default Rating;