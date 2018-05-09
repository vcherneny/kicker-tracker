class GamesController < ApplicationController
  def index
    render json: Game.all
  end

  def current
    render json: Game.current
  end

  def create
    @game = Game.create

    render json: @game
  end
end