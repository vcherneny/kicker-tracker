import React from 'react';
import { List, Row, Col } from 'antd';

export class GamesList extends React.Component {
  renderGame = (game) => {
    return <List.Item>{game.updated_at}</List.Item>
  }

  render() {
    return (
      <List
        size="large"
        dataSource={this.props.games}
        renderItem={this.renderGame}
      />
    );
  }
}