import React from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Icon20StatisticsOutline from '@vkontakte/icons/dist/20/statistics_outline';
import Icon20HomeOutline from '@vkontakte/icons/dist/20/home_outline';
import Icon20GearOutline from '@vkontakte/icons/dist/20/gear_outline';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';

const Settings = ({ id, changePanel, ROUTES }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Настройки</PanelHeader>
            <Group title='Общие настройки'>
                <FormLayout>
                    <Input top="Кол-во баллов за лайк" />
                    <Input top="Кол-во баллов за репост" />
                </FormLayout>
                <Div>
                    <Button size="xl" level="2">
                        Сохранить
                    </Button>
                </Div>
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
                            className='tab-navigator__icon'
                        />
                    </Button>
                    <Button mode='tertiary' onClick={() => changePanel(ROUTES.SETTINGS)}>
                        <Icon20GearOutline
                            width='24'
                            height='24'
                            className='tab-navigator__icon tab-navigator__icon--active'
                        />
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
}

export default Settings;