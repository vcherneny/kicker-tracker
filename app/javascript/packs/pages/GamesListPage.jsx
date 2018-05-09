import React from 'react';
import request from 'axios';


export class GamesListPage extends React.Component  {
  componentWillMount() {
    console.log(this.props)
    request.get('/').then(resp => console.log('resp', resp));
  }

  render() {
    return <div>games</div>
  }
}