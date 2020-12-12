import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';

import './Welcome.css';

const Welcome = ({ id, changePanel, ROUTES }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Welcome</PanelHeader>
            <Group title="Перейти на главный экран">
                <Div className='welcome__content-box'>
                    <Title level="1" weight="semibold" style={{ marginBottom: 16 }}>
                        SMMGAME 2.0
                    </Title>
                    <Text weight="regular" style={{ marginBottom: 16 }}>
                        Text regular
                    </Text>
                </Div>
            </Group>
            <FixedLayout vertical="bottom">
                <Div>
                    <Button size="xl" level="2" onClick={() => changePanel(ROUTES.HOME)}>
                        ОК
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
}

export default Welcome;