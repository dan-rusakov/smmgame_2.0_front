import React from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import './Achievements.css';
import firstActionImg from '../../img/achievement-first-action.svg';
import owlImg from '../../img/achievement-owl.svg';

const Achievements = ({ id }) => {
    return (
        <Panel id={id}>
            <PanelHeader>Награды</PanelHeader>
            <Div className='achievements__content-box'>
                <div className='achievements__achievement'>
                    <img
                        className='achievements__achievement-img'
                        src={firstActionImg}
                        alt="Награда за первое действие"
                        width='128'
                        height='128'
                    />
                    <Text weight="regular">Первая награда</Text>
                </div>
                <div className='achievements__achievement'>
                    <img
                        className='achievements__achievement-img'
                        src={owlImg}
                        alt="Награда за 100 комментариев"
                        width='128'
                        height='128'
                    />
                    <Text weight="regular">Приветливая сова</Text>
                </div>
            </Div>
        </Panel>
    );
}

export default Achievements;