class ScoresController < ApplicationController
  # before_action :set_current_game

  def left
    if current_game.present?
      left_team_score = current_game.left_team_score + 1
      current_game.update(left_team_score: left_team_score)
    end
  end

  def right
    if current_game.present?
      right_team_score = current_game.right_team_score + 1
      current_game.update(right_team_score: right_team_score)
    end
  end

  private

  def current_game
    @current_game ||= Game.current
  end
end
