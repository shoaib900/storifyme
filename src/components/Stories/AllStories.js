import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col } from 'antd'
import { deleteStory, activeStory } from '../../redux/slices/storiesSlice'
import { useRedux } from '../../hooks'
import {
    getKeysFromObject,
    isValidObjectWithKeys,
} from '../../helper/meta'

import { STORIES_KEY, VIEW_STORY, VIEW } from '../../helper/contants'
import BasicButton from '../form_control/BasicButton'
import MenuBar from '../form_control/MenuBar'

const AllStories = () => {
    let history = useHistory()
    let [dispatch, , getState] = useRedux()
    let stories = getState(STORIES_KEY)
    const goto = (url) => history.push(url)
    return <>
        {isValidObjectWithKeys(stories.data)
            ? getKeysFromObject(stories.data).map((storyId, i) => (
                <Col span={4} key={i}>
                    <MenuBar
                        menuItems={[
                            { action: () => goto(`/story/${storyId}`), text: 'View' },
                            {
                                action: () => dispatch(deleteStory({ id: storyId })),
                                text: 'Delete',
                            },
                        ]}
                        actionTrigger='contextMenu'
                    >
                        <Card
                            // hoverable
                            style={{
                                width: 200,
                                height: 360,
                                borderRadius: 15,
                                textAlign: 'center',
                                padding: '120px 0',
                                background: '#F0F2F5',
                            }}
                        >
                            <BasicButton
                                onClick={() => {
                                    dispatch(activeStory({ id: storyId }))
                                    goto(`/story/${storyId}`)
                                }}
                                withTooltip
                                tooltipProps={{
                                    tooltipTitle:
                                        `${VIEW} ${stories.data[storyId].name}` ?? VIEW_STORY,
                                }}
                            >
                                {VIEW_STORY}
                            </BasicButton>
                        </Card>
                    </MenuBar>
                </Col>
            ))
            : ''}</>
}

export default AllStories