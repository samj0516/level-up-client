import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from './EventProvider'
import { GameContext } from './GameProvider'
export const EventForm = () => {
    const history = useHistory()
    const { getGames, games } = useContext(GameContext)
    const { createEvent, events, getEvents } = useContext(EventContext)
    const [currentEvent, setEvent] = useState({
        name: "",
        event_date: "",
        event_time: "",
        game: 0
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEvent = { ...currentEvent }
        newEvent[domEvent.target.name] = domEvent.target.value
        setEvent(newEvent)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name of Event: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={ currentEvent.game }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_date">Date: </label>
                    <input type="date" name="event_date" required autoFocus className="form-control"
                        value={currentEvent.event_date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_time">Time: </label>
                    <input type="time" name="event_time" required autoFocus className="form-control"
                        value={currentEvent.event_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        event_date: currentEvent.event_date,
                        event_time: currentEvent.event_time,
                        game: currentEvent.game
                    }
                    
                    createEvent(event)
                        .then(()=> history.push('/events'))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}