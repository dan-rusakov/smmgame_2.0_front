import React, {useState} from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import axios from 'axios';

const Settings = ({ id, ROUTES, changeView, BACKEND_URL }) => {
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState('');

    const submitSettingsForm = () => {
        axios.post(BACKEND_URL + '/settings' + window.location.search, {
            score_by_likes: likes,
            score_by_comments: comments,
        })
            .then(() => {
                changeView(ROUTES.HOME);
            });
    }

    return (
        <Panel id={id}>
            <PanelHeader>Настройки</PanelHeader>
            <Group title='Общие настройки'>
                <FormLayout>
                    <Input top="Кол-во баллов за лайк" onChange={(evt) => setLikes(evt.value)} />
                    <Input top="Кол-во баллов за репост" onChange={(evt) => setComments(evt.value)} />
                </FormLayout>
                <Div>
                    <Button size="xl" level="2" onClick={submitSettingsForm}>
                        Сохранить
                    </Button>
                </Div>
            </Group>
        </Panel>
    );
}

export default Settings;