$(function(){
    function buildHTML(message){
      var image = message.image.url ? `<img class="lower-message__image" src="${message.image.url}">` : "" ;
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.nickname}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.text}
                        ${image}
                      </p>
                    </div>
                  </div>`
    return html
    }
  
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      var html = buildHTML(message)
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset('')
      $('input').click(function(){
        $('input').prop('disabled', false);
      })
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  
  var reloadMessages = function() { 
      if(window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $(".message").last().data("message-id")
        $.ajax({
          url: 'api/messages',
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          console.log(messages)
          var insertHTML = '';
          $.each(messages, function(i, message){
            console.log(message)
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({scrolltop: $('.messages')[0].scrollHeight});
        })
        .fail(function() {
          console.log('error');
        });
      }

  }
    setInterval(reloadMessages, 7000);
});

