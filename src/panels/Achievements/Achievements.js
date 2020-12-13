import React, {useEffect, useState} from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import './Achievements.css';
import firstActionImg from '../../img/achievement-first-action.svg';
import owlImg from '../../img/achievement-owl.svg';
import snakeImg from '../../img/achievement-snake.svg';
import Tooltip from "@vkontakte/vkui/dist/components/Tooltip/Tooltip";

const ICONS_LIBRARY = {
    'first_action': firstActionImg,
    'comments_10': owlImg,
    'likes_10': snakeImg,
}


const Achievements = ({ id }) => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        setAchievements([
            {
                slug: 'first_action',
                title: 'Первая награда',
                description: 'Награда за первое действие',
                is_description_visible: false,
            },
            {
                slug: 'comments_10',
                title: 'Приветливая сова',
                description: 'Награда за 10 комментарий',
                is_description_visible: false,
            },
            {
                slug: 'likes_10',
                title: 'Змея игрунья',
                description: 'Награда за 10 лайков',
                is_description_visible: false,
            },
        ])
    }, []);

    const achievementsList = () => {
        return achievements.map((item, index) => (
                <Tooltip
                    key={item.slug}
                    mode='light'
                    text={item.description}
                    isShown={item.is_description_visible}
                    onClose={() => setAchievements((achievements) => {
                        const newAchievements = [...achievements];
                        newAchievements[index].is_description_visible = false;

                        return newAchievements;
                    })}
                    offsetX={10}
                >
                    <div
                        className='achievements__achievement'
                        onClick={() => setAchievements((achievements) => {
                            const newAchievements = [...achievements];
                            newAchievements[index].is_description_visible
                                = !newAchievements[index].is_description_visible;

                            return newAchievements;
                        })}
                    >
                        <img
                            className='achievements__achievement-img'
                            src={ICONS_LIBRARY[item.slug]}
                            alt={item.title}
                            width='128'
                            height='128'
                        />
                        <Text weight="regular">{item.title}</Text>
                    </div>
                </Tooltip>
            )
        )
    }

    return (
        <Panel id={id}>
            <PanelHeader>Награды</PanelHeader>
            <Div className='achievements__content-box'>
                {achievementsList()}
            </Div>
        </Panel>
    );
}

export default Achievements;