import React, { useState, useEffect } from 'react';

const logo = 'codenation-logo.png';
const whiteSquare = 'white180x180.png';

const unclickedStyle = {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    margin: '5px',
    border: '2px solid black',
    borderRadius: '5px'
};

const clickedStyle = {
    ...unclickedStyle,
    objectFit: 'cover',
};

export default function Card({ cardsFlipped, catData, dispatch, flipped, id, matched, src}) {
    const [style, setStyle] = useState(unclickedStyle);

    function handleClick() {
        if (!flipped && cardsFlipped.length < 2) {
            setTimeout(() => {
                setStyle(clickedStyle);
            }, 100)

            dispatch({
                type: 'FLIP_CARD',
                payload: id
            });

        }
    }

    useEffect(() => {
        if (cardsFlipped.length === 2) {
            if (catData[cardsFlipped[0]]?.id === catData[cardsFlipped[1]]?.id) {
                dispatch({
                    type: 'MATCH_CARDS'
                });
            } else {
                setTimeout(() => {
                    dispatch({
                        type: 'FLIP_CARDS_BACK'
                    });
                    setStyle(unclickedStyle);
                }, 3000);
            }
        }
    }, [cardsFlipped, catData, dispatch]);

    if (flipped || matched) {
        return (
            <div>
                <img
                    style={clickedStyle}
                    src={src}
                    alt={`cat ${id}`}
                />
            </div>
        );
    }
    return (
        <div>
            <img
                style={style}
                src={logo}
                onClick={handleClick}
                alt={`cat ${id}`}
            />
        </div>
    );
}
