require 'faraday'

class Api::V1::StocksController < ApplicationController

  API_KEY = "3ECUwVQF3FECSQdLllmLmsT9jJzmwEBC"

  def index
    response = Faraday.get "https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=#{API_KEY}"
    parsed_response = JSON.parse(response.body)
    render json: parsed_response
  end

end