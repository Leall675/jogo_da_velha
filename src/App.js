import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [ gameData, setGameData ] = useState([0,0,0,0,0,0,0,0,0,])
  const [turn, setTurn] = useState(1)
  const [winningCombo, setWinningCombo] = useState(null)

  const winningCombinations = [
    //horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonais
    [0, 4, 8],
    [2, 4, 6],
  ]

  const handleClick = (clickedIndex) => {
    console.log(clickedIndex)

    if (gameData[clickedIndex] !== 0){
      return;
    }
    if (winningCombo){
      console.log(winningCombo)
      return;
    }

    setGameData( (prev) => {
      const newGameData = [...prev]
      newGameData[clickedIndex] = turn
      return newGameData
    })
    setTurn( (prev) => (prev === 1 ? 2 : 1))
  }

  useEffect( () => {
    checkWinner()
  }, [ gameData ])

  useEffect(() => {
    if (winningCombo){
      alert('Jogo teve um ganhador')
    }
  }, [winningCombo])

  const checkWinner = () => {
    console.log('checking winner')
    let winner = null
    for(let values of winningCombinations){

      if (
        gameData[values[0]] === 1 &&
        gameData[values[1]] === 1 &&
        gameData[values[2]] === 1
      ) {
        winner = 'player1'
      }
      if (
        gameData[values[0]] === 2 &&
        gameData[values[1]] === 2 &&
        gameData[values[2]] === 2
      ) {
        winner = 'player2'
      }
      if (winner){
        setWinningCombo(values)
        break
      }
    }
  }


  return (
      <>
        <div className='board-name'>
          {gameData.map((value, index) => (
              <span 
                key={index} 
                onClick={() => handleClick(index)}>
                <aabr title="" >{index}</aabr>
                {value === 1 && '❌'}
                {value === 2 && '⭕️'}
              </span>
            ))
          }
        </div>
      </>
  );
}

export default App;
