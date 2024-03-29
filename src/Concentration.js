import React, { useEffect, useReducer } from 'react';
import Grid from './Grid';
import WinModal from './WinModal';

const numberOfCats = 8;
const catApiKey = 'e7e0b9dd-9a5a-4061-bbf9-dd0b575e8945';
const catApiUrl = `https://api.thecatapi.com/v1/images/search?limit=${numberOfCats}`;

const initialState = {
    cardsFlipped: [],
    cardsMatched: [],
    catData: null,
    gameNumber: 1,
    showWinModal: false
};

const UPDATE_CAT_DATA = 'UPDATE_CAT_DATA';
const FLIP_CARD = 'FLIP_CARD';
const FLIP_CARDS_BACK = 'FLIP_CARDS_BACK';
const MATCH_CARDS = 'MATCH_CARDS';
const RESET_GAME = 'RESET_GAME';
const SHOW_WIN_MODAL = 'SHOW_WIN_MODAL';

function reducer(state, action) {

    let newState;
    let catData;
    let cardsFlipped;
    let catToFlip;
    let cardsMatched;

    switch (action.type) {
        case UPDATE_CAT_DATA:
            newState = {
                ...state,
                catData: action.payload,
            };
            break;
        case FLIP_CARD:
            cardsFlipped = [...state.cardsFlipped];
            cardsFlipped.push(action.payload);
            catData = [...state.catData];
            catToFlip = catData.findIndex((cat, i) => i === action.payload);

            catData[catToFlip].flipped = true;
            newState = {
                ...state,
                cardsFlipped,
                catData
            };
            break;
        case FLIP_CARDS_BACK:
            cardsFlipped = [...state.cardsFlipped];
            catData = [...state.catData];
            cardsFlipped.forEach(card => {
              catData[card].flipped = false;
            });
            newState = {
                ...state,
                catData,
                cardsFlipped: []
            };
            break;
        case MATCH_CARDS:
            cardsMatched = [...state.cardsMatched, ...state.cardsFlipped];
            catData = [...state.catData];
            newState = {
                ...state,
                cardsMatched,
                catData,
                cardsFlipped: []
            };
            break;
        case RESET_GAME:
            newState = {
              ...initialState,
              gameNumber: state.gameNumber + 1,
            };
            break;
        case SHOW_WIN_MODAL:
            newState = {
              ...state,
              showWinModal: true
            };
            break;
        default:
            newState = {
                ...state
            }
    }

    return newState;
}

export default function Concentration(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchOptions = {
      headers: {
        'x-api-key': catApiKey
      }
    };

    fetch(catApiUrl, fetchOptions).then((response) => {
      response.json().then((result) => {
        const processedData = processCatData(result);
        preloadImages(result);

        dispatch({
            type: UPDATE_CAT_DATA,
            payload: processedData
        });
      });
    });
  }, [state.gameNumber]);

  return (
    <div
        style={{
            boxSizing: 'border-box',
        }}
    >
        <WinModal 
            show={state.showWinModal}
            dispatch={dispatch}
            gameNumber={state.gameNumber}
        />
        <Grid
            cardsFlipped={state.cardsFlipped}
            cardsMatched={state.cardsMatched}
            catData={state.catData}
            dispatch={dispatch}
        />
    </div>
  );
}

function processCatData(data) {
  const duplicatedData = [];
  const randomizedData = [];

  for (let i = 0; i < data.length; i++) {
    const datum = {
      id: data[i].id,
      url: data[i].url,
      flipped: false,
      matched: false
    }
    duplicatedData.push(datum);
  }

  for (let i = 0; i < data.length; i++) {
    const datum = {
      id: data[i].id,
      url: data[i].url,
      flipped: false,
      matched: false
    }
    duplicatedData.push(datum);
  }

  while (duplicatedData.length) {
    const randomIndex = Math.floor(Math.random() * duplicatedData.length);
    const randomCat = duplicatedData.splice(randomIndex, 1)[0];

    randomizedData.push(randomCat);
  }

  return randomizedData;
}

function preloadImages(data) {
  data.forEach(cat => {
    const image = new Image();

    image.src = cat.url;
    window[cat.url] = image;
  });
}