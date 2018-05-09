class ScoresUpdateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "scores_update"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
