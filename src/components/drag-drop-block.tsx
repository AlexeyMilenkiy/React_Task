import React, { useRef, useState } from 'react';
import styled from 'styled-components'

import { Colors, FontWeights, FontSizes } from '../lib/style-guide'
import { randomClassName } from '../lib/rcn'
import { classNames } from '../lib/classnames'

import icon from '../icons/circle.png';

const rcn = randomClassName()

const DragDropBlock: FC = ({ className }) => {
    const inputEl = useRef(null);
    const [inProcess, setProcess] = useState(false);

    const dropHandler = (ev: Event | React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setProcess(false);
        let file = {};

        const transfer = ev.nativeEvent && ev.nativeEvent.dataTransfer;

        if (transfer.items) {
            for (let i = 0; i < transfer.items.length; i++) {
                if (transfer.items[i].kind === 'file') {
                    file = transfer.items[i].getAsFile();
                    console.log(file);
                }
            }
        } else {
            for (var i = 0; i < transfer.files.length; i++) {
                console.log(transfer.files[i]);
            }
        }
    };

    const handleChange = (selectorFiles: FileList | null) => {
        if (selectorFiles) {
            console.log(selectorFiles[0]);
        }
    };

    return (
        <div className={className}
            draggable={true}
            ref={inputEl}
            onDragEnter={() => setProcess(true)}
            onDragLeave={() => setProcess(false)}
            onDrop={(event) => dropHandler(event)}
            onDragOver={(event) => event.preventDefault()}>

            <img src={icon} />
            <span className={rcn('drag-text')}>Drag & drop here</span>
            <span className={rcn('drag-or')}>- or -</span>

            <div className={rcn('upload-btn-wrapper')}>
                <button className={rcn('btn')}>Select file to upload</button>
                <input className={rcn('input')}
                    name='file'
                    type="file"
                    ref={inputEl}
                    onChange={(e) => handleChange(e.target.files)} />
            </div>
        </div >
    )
}


const StyledDragDropBlock = styled(DragDropBlock)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .${rcn('input')} {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
    .${rcn('drag-text')} {
        font-weight: ${FontWeights.PR};
        ${FontSizes.small};
        color: ${Colors.TX2};
    }
    .${rcn('drag-or')} {
        ${FontSizes.small};
        color: ${Colors.TX3};

    }
    .${rcn('upload-btn-wrapper')} {
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    .${rcn('btn')} {
        font-weight: ${FontWeights.PR};
        ${FontSizes.small};
        text-align: center;
        color: #4991E5;
        border: 0;
        background-color: transparent;
    }
    .${rcn('upload-btn-wrapper')}:hover {
        cursor: pointer;
    }
`

export default StyledDragDropBlock;