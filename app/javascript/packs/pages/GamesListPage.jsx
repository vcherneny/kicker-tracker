import React from 'react';
import request from 'axios';
import { Layout, Button, Row, Col } from 'antd';
import moment from 'moment';
import { GamesList } from '../components';
import background from '../../../../app/assets/images/bg.jpg';
import golShout from '../../../../app/assets/audio/gol-shout.mp3';
import startGame  from '../../../../app/assets/audio/start-game.wav';
import endGame  from '../../../../app/assets/audio/end-game.wav';
import crowd  from '../../../../app/assets/audio/crowd.wav';

const { Header, Content} = Layout;

import { ActionCableProvider } from 'react-actioncable-provider'
const cable = ActionCable.createConsumer(`ws://${window.location.host}/cable`)

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
      winner: null,
      timer: 0,
    }
    this.timer = null;
  }

  golShoutSound() {
    const sound = new Audio(golShout);
    setTimeout(() => sound.play());
    setTimeout(() => this.crowdSound(), 4000);
  }

  startGameSound() {
    const sound = new Audio(startGame);
    setTimeout(() => sound.play());
  }

  endGameSound() {
    const sound = new Audio(endGame);
    setTimeout(() => sound.play());
  }

  crowdSound() {
    const sound = new Audio(crowd);
    setTimeout(() => sound.play());
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
        currentGame: game,
        winner: null,
      });
      this.startGameSound();
      this.startClock();
      this.setupActionCable();
    });
  }

  endGame = () => {
    request.delete('/games').then(resp => {
      const game = resp.data;
      console.log(game)

      this.setState({
        gameIsStarted: false,
        currentGame: game
      });
      this.endGameSound();
      this.clearClock();
    });
  }

  leftScore() {
    if (this.state.currentGame) return this.state.currentGame.left_team_score;

    return 0;
  }

  rightScore() {
    if (this.state.currentGame) return this.state.currentGame.right_team_score;

    return 0;
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

  goToRecent = () => {
    this.props.history.push('/list');
  }

  recentGamesButton() {
    if (this.state.gameIsStarted) return null;

    return (
      <div className='button-row' style={styles.buttonRow}>
        <Button onClick={this.goToRecent}>Recent games</Button>
      </div>
    )
  }

  checkGameState(prev, next) {
    if (prev.right_team_score < next.right_team_score) {
      return this.golShoutSound();
    }
    if (prev.left_team_score < next.left_team_score) {
      return this.golShoutSound();
    }
  }

  startClock() {
    setInterval(() => this.setState({ timer: this.state.timer + 1 }), 1000);
  }

  clearClock() {
    clearInterval(this.timer);
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
              currentGame: game,
              winner: null,
              timer: 0,
            }, this.checkGameState(this.state.currentGame, game));
          } else if (game.finished){
            if (this.state.currentGame.right_team_score !== this.state.currentGame.left_team_score){
              const winner = this.state.currentGame.right_team_score > this.state.currentGame.left_team_score ? 'Team 2' : 'Team 1'
              this.setState({winner: winner});
            }
            this.setState({
              gameIsStarted: false,
              currentGame: game,
              timer: 0,
            });
          }
        }
      }
    )
  }

  destroyActionCable() {
    this.subscription.unsubscribe();
  }

  clock() {
    if (!this.state.gameIsStarted) { return null; }
    const formatedTime = moment.utc(this.state.timer * 1000).format('mm:ss');
    return (
      <div className="score-row" style={styles.scoreRow}>
        <div className="score-col" style={{ ...styles.scoreCol }}>
          <div className="team-name" style={{color: '#00CC11'}}>
            {formatedTime}
          </div>
        </div>
      </div>);
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
                  Team 1 <span style={{width: '25px', height: '25px', borderRadius: '50%', display: 'inline-block', background: '#e5e5e5'}}></span>
                </div>
                <div className="team-score">
                  {this.leftScore()}
                </div>
              </div>
              <div className="score-col" style={styles.scoreCol}>
                <div className="team-name">
                  <span style={{width: '25px', height: '25px', borderRadius: '50%', display: 'inline-block', background: '#0000FF'}}></span> Team 2
                </div>
                <div className="team-score">
                  {this.rightScore()}
                </div>
              </div>
            </div>
            { (this.state.winner) ? (
                <div className="score-row" style={styles.scoreRow}>
                  <div className="score-col" style={{ ...styles.scoreCol }}>
                    <div className="team-name">
                      {this.state.winner} win!
                    </div>
                  </div>
                </div>
              ) : this.clock()
            }
            {this.recentGamesButton()}
          </div>
        </Content>
      </Layout>
    );
  }
}
