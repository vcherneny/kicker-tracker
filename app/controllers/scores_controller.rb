class ScoresController < ApplicationController
  before_action :set_current_game

  def left
    @current_game.increment!(:left_team_score) if @current_game.present?
  end

  def right
    @current_game.increment!(:right_team_score) if @current_game.present?
  end

  private

  def set_current_game
    @current_game = Game.current
  end
end
