import React, { useState, useEffect } from 'react';

const logo = 'codenation-logo.png';
const meow = new Audio('meow.mp3');

const unclickedStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'contain',
    margin: '5px',
    border: '2px solid black',
    borderRadius: '5px'
};

const clickedStyle = {
    ...unclickedStyle,
    objectFit: 'cover',
};

export default function Card({ cardsFlipped, cardsMatched, catData, dispatch, flipped, id, matched, src}) {
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
        if ((cardsMatched.length === 16) && (id === cardsMatched[15])) {
            dispatch({
                type: 'SHOW_WIN_MODAL'
            });
        } else if (
            (cardsFlipped.length === 2) &&
            ((id === cardsFlipped[1]) || (id === cardsFlipped[0]))
            ) {
            if (catData[cardsFlipped[0]]?.id === catData[cardsFlipped[1]]?.id) {
                meow.play();
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
    }, [cardsFlipped, catData]);

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
