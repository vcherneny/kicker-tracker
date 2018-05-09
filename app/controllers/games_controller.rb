class GamesController < ApplicationController
  def index
    render json: Game.all
  end

  def create
    @game = Game.create

    render json: @game
  end
end
