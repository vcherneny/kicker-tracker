class Game < ApplicationRecord
  before_create :mark_all_games_as_finished
  after_create :send_data_to_channel
  after_update :check_if_finished, :send_data_to_channel

  def self.current
    Game.find_by(finished: false)
  end

  def check_if_finished
    update(finished: true) if (left_team_score == 5 || right_team_score == 5) && finished == false
  end

  def mark_all_games_as_finished
    Game.update_all(finished: true)
  end

  def send_data_to_channel
    ActionCable.server.broadcast 'scores_update_channel', message: {game: self.to_json}
  end
end
