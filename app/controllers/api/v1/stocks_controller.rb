require 'faraday'

class Api::V1::StocksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    stocks = Stock.all
    render json: stocks
  end

  def search
    stocks = Stock.where("ticker ILIKE ? OR name ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
    stocks = stocks.limit(8)
    render json: stocks
  end

end