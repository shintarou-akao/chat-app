class RoomChannel < ApplicationCable::Channel
  #監視したときに使うメソッド
  #フロントとバックが繋がったとき
  def subscribed
     stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    message = Message.create!(content: data['message'])
    template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message})
    # roomチャンネルに配信することを示唆（room_channelはroom.jsのチャンネルを指定）
    ActionCable.server.broadcast 'room_channel', template
  end
end
