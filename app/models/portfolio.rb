class Portfolio < ApplicationRecord
  validates :name, presence: true

  has_many :holdings
  has_many :stocks, through: :holdings
  belongs_to :user
end