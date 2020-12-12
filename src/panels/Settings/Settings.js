import React from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';

const Settings = ({ id }) => {
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
        </Panel>
    );
}

export default Settings;