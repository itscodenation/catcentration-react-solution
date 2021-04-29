import React from 'react';
import Card from './Card';

export default function Row(props) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            {
                props.catDataRow &&
                props.catDataRow.map((cat, i) =>
                    <Card
                        cardsFlipped={props.cardsFlipped}
                        catData={props.catData}
                        dispatch={props.dispatch}
                        flipped={cat.flipped}
                        id={props.rowIndex + i}
                        key={cat.id + i}
                        src={cat.url}
                    />
                )
            }
        </div>
    );
}