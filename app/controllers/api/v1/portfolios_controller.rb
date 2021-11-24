class Api::V1::PortfoliosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Portfolio.all
  end

  def show
    portfolio = Portfolio.find(params[:id])

    stock_data = []
    portfolio.stocks.each do |stock|
      ticker = stock.ticker
      response = Faraday.get "https://finnhub.io/api/v1/quote?symbol=#{ticker}&token=#{ENV['FINNHUB_API_KEY']}"
      parsed_response = JSON.parse(response.body)
      stock_data << parsed_response
    end

    render json: { portfolio: portfolio, holdings: portfolio.stocks, stock_data: stock_data }
  end

  def create
    new_portfolio = Portfolio.new(name: params["_json"])
    
    if new_portfolio.save
      render json: new_portfolio
    else
      render '/portfolios/new'
    end
  end
end