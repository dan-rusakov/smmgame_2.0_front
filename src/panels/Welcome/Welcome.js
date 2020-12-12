import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import bridge from '@vkontakte/vk-bridge';

import './Welcome.css';

const Welcome = ({ id, changeView, ROUTES, STORAGE_KEYS }) => {

    const haveVisitedPanel = async () => {
        try {
            await bridge.send('VKWebAppStorageSet', {
                key: STORAGE_KEYS.STATUS,
                value: 'visited',
            });
        } catch(err) {
            console.error(err);
        }
    }

    const confirmBtnHandler = async () => {
        await haveVisitedPanel();
        changeView(ROUTES.HOME);
    }

    return (
        <Panel id={id} centered={true}>
            <Group title="Перейти на главный экран">
                <Div className='welcome__content-box'>
                    <Title level="1" weight="semibold" style={{ marginBottom: 16 }}>
                        SMMGAME
                    </Title>
                    <Text weight="regular" style={{ marginBottom: 16 }}>
                        Обменивай лайки на баллы
                    </Text>
                </Div>
            </Group>
            <FixedLayout vertical="bottom">
                <Div>
                    <Button size="xl" level="2" onClick={confirmBtnHandler}>
                        ОК
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
}

export default Welcome;