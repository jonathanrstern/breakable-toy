class Stock < ApplicationRecord
  validates :ticker, presence: true
  validates :name, presence: true
end