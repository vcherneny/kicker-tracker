class Game < ApplicationRecord
  before_create :mark_all_games_as_finished
  after_update :check_if_finished

  def self.current
    Game.find_by(finished: false)
  end

  def check_if_finished
    update(finished: true) if left_team_score == 10 || right_team_score == 10
  end

  def mark_all_games_as_finished
    Game.update_all(finished: true)
  end
end
