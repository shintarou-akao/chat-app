App.room = App.cable.subscriptions.create("RoomChannel", {
  //バックエンド側と繫がったかを確認できる関数
  connected: function() {
     console.log('connected')
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },
    // broadcastで送られてきたデータを受け取る関数
  received: function(message) {
    const messages = document.getElementById('messages')
    messages.innerHTML += message
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    // speakはroom_channel.rbのspeakメソッドを実行している
    return this.perform('speak', {message: content});
  }
});

document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('chat-input')
  const button = document.getElementById('button')
  button.addEventListener('click', function(){
    const content = input.value
    // server側に送信
    App.room.speak(content)
    // inputのvalueを消す
    input.value = ''
  })
})
