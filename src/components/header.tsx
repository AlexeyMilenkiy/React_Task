import React from 'react';
import styled from 'styled-components'

import { Colors, FontWeights, FontSizes } from '../lib/style-guide'
import { randomClassName } from '../lib/rcn'

const rcn = randomClassName()

const Header: FC = ({ className }) => (
    <div className={className}>
        <h1 className={rcn('headline')}>Company Logo</h1>
        <p className={rcn('tagline')}>Logo should be square, 100px size and in png, jpeg file format.</p>
    </div>
);

const StyledHeader = styled(Header)`
    width: 100%;
    height: 79px;
    background: ${Colors.PureWhite};
    border-bottom: 1px solid ${Colors.BG2};
    padding: 21px 29px 18px 24px;

    .${rcn('headline')} {
        font-weight: ${FontWeights.HB};
        ${FontSizes.huge};
        color: ${Colors.TX1};
    }

    .${rcn('tagline')} {
        font-weight: ${FontWeights.PR};
        ${FontSizes.medium};
        color: ${Colors.TX3};
    }
`

export default StyledHeader;