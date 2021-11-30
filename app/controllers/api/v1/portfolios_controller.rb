class Api::V1::PortfoliosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Portfolio.all
  end

  def show
    portfolio = Portfolio.find(params[:id])

    stock_data = []
    holdings = portfolio.stocks
    holdings.each do |stock|
      response = Faraday.get "https://finnhub.io/api/v1/quote?symbol=#{stock.ticker}&token=#{ENV['FINNHUB_API_KEY']}"
      stock_data << JSON.parse(response.body)
    end

    render json: { portfolio: portfolio, holdings: holdings, stock_data: stock_data }
  end

  def create
    new_portfolio = Portfolio.new(name: params["_json"])
    
    if new_portfolio.save
      render json: new_portfolio
    else
      render '/portfolios/new'
    end
  end

  def update
    portfolio = Portfolio.find(params[:id])
    portfolio.name = params["_json"]

    if portfolio.save
      render json: portfolio
    else
      render json: { error: portfolio.errors.full_messages.to_sentence }
    end
  end
end