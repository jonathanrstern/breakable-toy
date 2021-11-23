class Stock < ApplicationRecord
  validates :ticker, presence: true
  validates :name, presence: true

  has_many :holdings
  has_many :portfolios, through: :holdings
end