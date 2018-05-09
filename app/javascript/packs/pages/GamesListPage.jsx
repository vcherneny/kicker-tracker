import React from 'react';
import request from 'axios';
import { Layout, Button, Row, Col } from 'antd';
import { GamesList } from '../components';
import background from '../../../../app/assets/images/bg.jpg';

const { Header, Content} = Layout;

import { ActionCableProvider } from 'react-actioncable-provider'
const cable = ActionCable.createConsumer(`ws://${window.location.hostname}/cable`)

const contentStyle = {
  display: 'flex',
  flexFlow: 'column',
}

const styles = {
  scoreRow: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '32px',
  },
  scoreCol: {
    textAlign: 'center',
    color: '#fff',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    marginBottom: '30px'
  }
}

export class GamesListPage extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      gameIsStarted: false,
      currentGame: null,
    }
  }

  componentWillMount() {
    request.get('/games/current').then(resp => {
      const game = resp.data;

      if (game && !game.finished) {
        this.setState({
          gameIsStarted: true,
          currentGame: game
        });

        this.setupActionCable();
      }
    });
  }

  gamesList() {
    if (!this.state.games.length) return null;

    return <GamesList games={this.state.games}/>;
  }

  createGame = () => {
    request.post('/games').then(resp => {
      const game = resp.data;

      this.setState({
        gameIsStarted: true,
        currentGame: game
      });

      this.setupActionCable();
    });
  }

  endGame = () => {
    request.delete('/games').then(resp => {
      const game = resp.data;

      this.setState({
        gameIsStarted: false,
        currentGame: null
      })
    });
  }

  leftScore() {
    if (!this.state.gameIsStarted) return 0;

    return this.state.currentGame.left_team_score;
  }

  rightScore() {
    if (!this.state.gameIsStarted) return 0;

    return this.state.currentGame.right_team_score;
  }

  button() {
    if(!this.state.gameIsStarted) {
      return (
        <div className='button-row' style={styles.buttonRow}>
          <Button type="primary" onClick={this.createGame}>New game</Button>
        </div>
      )
    } else {
      return (
        <div className='button-row' style={styles.buttonRow}>
          <Button type="danger" onClick={this.endGame}>End game</Button>
        </div>
      )
    }
  }

  setupActionCable = () => {
    this.subscription = cable.subscriptions.create(
      'ScoresUpdateChannel',
      {
        received: (data) => {
          const game = JSON.parse(data.message.game)
          if (game && !game.finished) {
            this.setState({
              gameIsStarted: true,
              currentGame: game
            });
          }
        }
      }
    )
  }

  destroyActionCable() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <Layout>
        <Header style={{
          fontSize: '32px',
          'textAlign': 'center',
          color: '#fff'
        }}>
          Kicker Tracker
        </Header>
        <Content style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
          <div style={{ }}>
            {this.button()}
            <div className="score-row" style={styles.scoreRow}>
              <div className="score-col" style={{ ...styles.scoreCol, marginRight: '100px' }}>
                <div className="team-name">
                  Team 1
                </div>
                <div className="team-score">
                  {this.leftScore()}
                </div>
              </div>
              <div className="score-col" style={styles.scoreCol}>
                <div className="team-name">
                  Team 2
                </div>
                <div className="team-score">
                  {this.rightScore()}
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
