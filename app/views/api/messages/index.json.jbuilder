json.array! @messages do |message|
  json.text message.content
  json.image message.image
  json.created_at message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.nickname message.user.name
  json.id message.id
end