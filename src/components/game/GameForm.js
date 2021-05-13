import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)
    const {game_id} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        maker: "",
        max_players: 0,
        min_players: 0,
        difficulty_level: 1,
        gamer: 0,
        type: 0
        
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes().then(()=>{
            if(game_id){
                getGameById(game_id).then(setCurrentGame)
            }
        })
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
   const handleChange = (event) => {
       const newGameState = { ...currentGame}
       newGameState[event.target.name] = event.target.value
       setCurrentGame(newGameState)
        
   }
   

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="min_players">Minimum players needed: </label>
                    <input type="text" name="min_players" required autoFocus className="form-control"
                        value={currentGame.min_players}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_players">Maximum players allowed: </label>
                    <input type="text" name="max_players" required autoFocus className="form-control"
                        value={currentGame.max_players}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">GameType: </label>
                    <select name="type" className="form-control"
                        value={currentGame.type}
                        onChange={handleChange}>
                        <option value={currentGame.type}>Select a Game Type</option>
                        {gameTypes.map(gameType => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.type}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    
                    if(game_id){
                        const game = {
                            id: currentGame.id,
                            name: currentGame.name,
                            maker: currentGame.maker,
                            max_players: parseInt(currentGame.max_players),
                            min_players: parseInt(currentGame.min_players),
                            difficulty_level: parseInt(currentGame.difficulty_level),
                            type: parseInt(currentGame.type)
                        }
                        updateGame(game).then(()=> history.push("/"))
                    }else{
                        const game = {
                            name: currentGame.name,
                            maker: currentGame.maker,
                            max_players: parseInt(currentGame.max_players),
                            min_players: parseInt(currentGame.min_players),
                            difficulty_level: parseInt(currentGame.difficulty_level),
                            type: parseInt(currentGame.type)
                        }
                        createGame(game).then(()=> history.push("/"))
                    }

                }}
                className="btn btn-primary">{game_id ? "Edit" : "Create"}</button>
        </form>
    )
}
