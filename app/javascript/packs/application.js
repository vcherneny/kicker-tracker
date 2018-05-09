import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom';
import { GamesListPage } from './pages';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <BrowserRouter>
      <Route path="/" component={GamesListPage} />
    </BrowserRouter>),
    document.body.appendChild(document.createElement('div')),
  )
})

console.log('Hello World from Webpacker')
