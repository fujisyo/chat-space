# README

# users テーブル

|column|type|options|
|------|----|-------|
|name|string|null :false|
|email|string|add_index: users, :email, unique: true|
|password|string|null: false|

# Association
has_many :tweets
has_many :groups, through: groups_users
has_many :groups_users

# tweets テーブル

|column|type|options|
|------|----|-------|
|image|text|null :true|
|tweet|text|null :false|
|user_id|integer|null :false, foren_key: true|
|group_id|integer|null :false, foren_key: true|


# Association

belongs_to :user
belongs_to :group

# groups テーブル

|column|type|options|
|------|----|-------|
|name|string|null :false|

# Association
has_many :users, through: groups_users
has_many :tweets
has_many :groups_users

groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

# Association
belongs_to :group
belongs_to :user