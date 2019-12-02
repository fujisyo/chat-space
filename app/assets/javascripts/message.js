$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.nickname}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <img class="lower-message__image" src="${message.image.url}">
                    </div>
                  </div>`
    } else  {
      var html = `<div class="message">
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
                      </p>
                    </div>
                  </div>`
    }
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
  })
})