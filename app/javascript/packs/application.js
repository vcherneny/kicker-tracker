import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom';
import { GamesListPage, GamePage } from './pages';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
      <BrowserRouter>
        <div>
          <Route exact path="/" component={GamesListPage} />
          <Route exact path="/games/:id" component={GamePage} />
        </div>
      </BrowserRouter>),
    document.body.appendChild(document.createElement('div')),
  )
})

console.log('Hello World from Webpacker')
