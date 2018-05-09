import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom';
import { GamesListPage, GamePage } from './pages';
import { ActionCableProvider } from 'react-actioncable-provider'
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
      <BrowserRouter>
        <ActionCableProvider cable={cable}>
          <Route exact path="/" component={GamesListPage} />
          <Route exact path="/games/:id" component={GamePage} />
        </ActionCableProvider>
      </BrowserRouter>),
    document.body.appendChild(document.createElement('div')),
  )
})

console.log('Hello World from Webpacker')
