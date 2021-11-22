require 'faraday'

class Api::V1::StocksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  # def index
  #   response = Faraday.get "https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=#{ENV['API_KEY']}"
  #   parsed_response = JSON.parse(response.body)
  #   render json: parsed_response
  # end

  def index
    render json: Stock.all
  end

  def search
    stocks = Stock.where("name ILIKE ? OR ticker ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
    # ticker = params["search_string"].upcase
    # response = Faraday.get "https://api.polygon.io/v3/reference/tickers?ticker=#{ticker}&type=CS&market=stocks&active=true&sort=ticker&order=asc&limit=1000&apiKey=#{ENV['API_KEY']}"
    # parsed_response = JSON.parse(response.body)
    render json: stocks
  end

end