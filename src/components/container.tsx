import React, { useRef } from 'react';
import styled from 'styled-components'

import StyledHeader from './header';
import StyledDragDropBlock from './drag-drop-block';

import { Colors } from '../lib/style-guide'
import { randomClassName } from '../lib/rcn'

const rcn = randomClassName()

const Container: FC = ({ className }) => {
    return (<div className={className}>
        <StyledHeader />
        <div className={rcn('drag-and-drop-container')}>
            <StyledDragDropBlock />
        </div>
    </div>)
};

const StyledContainer = styled(Container)`
    width: 400px;
    height: 590px;
    background: ${Colors.PureWhite};
    border: 1px solid #E8F1FB;

    .${rcn('drag-and-drop-container')} {
        width: 100%;
        height: calc(100% - 79px);
        padding: 20px;
    }
`

export default StyledContainer 