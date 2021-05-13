import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()
    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" })
            }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.min_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.difficulty_level}</div>
                        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push(`/games/edit/${game.id}` )
            }}
        >Edit</button>
                    </section>
                })
            }
        </article>
        </>
    )
}