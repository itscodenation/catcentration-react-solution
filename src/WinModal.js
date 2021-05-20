import React from 'react';

function WinModal(props) {

    const style = {
        width: '100vw',
        height: '100vh',
        zIndex: '10',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#00ffcc',
        position: 'absolute',
        textAlign: 'center'
    }

    function handleClick() {
        props.dispatch({
            type: 'RESET_GAME'
        });
    }

    if (!props.show) {
        return <div></div>;
    }
    return (
        <div style={style}>
            <h1>You won!</h1>
            <button onClick={handleClick}>Click to play again</button>
        </div>
    );
}

export default WinModal;