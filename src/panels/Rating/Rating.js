import React from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell';

const Rating = ({ id }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Общий рейтинг</PanelHeader>
            <Group header={<Header mode="secondary">Топ 10 пользователей</Header>}>
                <SimpleCell
                    before={<Avatar size={40} src='' />}
                    after='15000'
                >Иван Иванов</SimpleCell>
                <SimpleCell
                    before={<Avatar size={40} src='' />}
                    after='15000'
                >Иван Иванов</SimpleCell>
                <SimpleCell
                    before={<Avatar size={40} src='' />}
                    after='15000'
                >Иван Иванов</SimpleCell>
            </Group>

            <Group header={<Header mode="secondary">Общая история операций</Header>}>
                <RichCell
                    caption="Вчера в 20:30"
                    after="+ 700"
                >
                    Лайк
                </RichCell>
                <RichCell
                    caption="Вчера в 20:30"
                    after="+ 700"
                >
                    Лайк
                </RichCell>
                <RichCell
                    caption="Вчера в 20:30"
                    after="+ 700"
                >
                    Лайк
                </RichCell>
            </Group>
        </Panel>
    );
}

export default Rating;