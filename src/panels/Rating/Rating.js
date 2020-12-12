import React from 'react'
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Icon20StatisticsOutline from "@vkontakte/icons/dist/20/statistics_outline";
import Icon20HomeOutline from "@vkontakte/icons/dist/20/home_outline";
import Icon20GearOutline from "@vkontakte/icons/dist/20/gear_outline";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";

const Rating = ({ id, changePanel, ROUTES }) => {
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

            <FixedLayout vertical="bottom">
                <Div className='tab-navigator'>
                    <Button mode='tertiary' onClick={() => changePanel(ROUTES.RATING)}>
                        <Icon20StatisticsOutline
                            width='24'
                            height='24'
                            className='tab-navigator__icon tab-navigator__icon--active'
                        />
                    </Button>
                    <Button mode='tertiary' onClick={() => changePanel(ROUTES.HOME)}>
                        <Icon20HomeOutline
                            width='24'
                            height='24'
                            className='tab-navigator__icon'
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
}

export default Rating;