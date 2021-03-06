import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameForm } from './game/GameForm.js'
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from './game/EventProvider.js'
import { EventList } from './game/EventList.js'
import { EventForm } from './game/EventForm'
import { ProfileProvider } from './auth/ProfileProvider'
import { Profile } from './auth/Profile'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
            <EventProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/edit/:game_id(\d+)">
                    <GameForm/>
                </Route>
            
                <Route exact path='/events/new'>
                    <EventForm />
                </Route>
                <Route exact path="/events">
                    <EventList />
                </Route>
            
            </EventProvider>
            </GameProvider>
            
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}