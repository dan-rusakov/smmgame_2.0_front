import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

const Loading = ({ id }) => {
    return (
        <Panel id={id} centered={true}>
            <ScreenSpinner size='large' />
        </Panel>
    );
}

export default Loading;