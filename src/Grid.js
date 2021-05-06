import React from 'react';
import Row from './Row';

export default function Grid(props) {

    if (!props.catData) {
        return null;
    }

    return (
        <div
            style={{
                width: '95vh',
                height: '95vh',
                margin: '0 auto'
            }}
        >
            <Row
                cardsFlipped={props.cardsFlipped}
                catData={props.catData}
                catDataRow={getRowData(1, props.catData)}
                dispatch={props.dispatch}
                rowIndex={0}
            />
            <Row
                cardsFlipped={props.cardsFlipped}
                catData={props.catData}
                catDataRow={getRowData(2, props.catData)}
                dispatch={props.dispatch}
                rowIndex={4}
            />
            <Row
                cardsFlipped={props.cardsFlipped}
                catData={props.catData}
                catDataRow={getRowData(3, props.catData)}
                dispatch={props.dispatch}
                rowIndex={8}
            />
            <Row
                cardsFlipped={props.cardsFlipped}
                catData={props.catData}
                catDataRow={getRowData(4, props.catData)}
                dispatch={props.dispatch}
                rowIndex={12}
            />
        </div>
    );
}

function getRowData(num, catData) {
    switch (num) {
        case 1:
            return [
                catData[0],
                catData[1],
                catData[2],
                catData[3]
            ]
        case 2:
            return [
                catData[4],
                catData[5],
                catData[6],
                catData[7]
            ]
        case 3:
            return [
                catData[8],
                catData[9],
                catData[10],
                catData[11]
            ]
        case 4:
            return [
                catData[12],
                catData[13],
                catData[14],
                catData[15]
            ]
        default:
            break;
    }
}