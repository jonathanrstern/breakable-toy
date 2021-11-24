class Api::V1::HoldingsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    stock = Stock.find_by(ticker: params['_json'])
    portfolio = Portfolio.find(params["portfolio_id"])

    new_holding = Holding.new(stock: stock, portfolio: portfolio)

    if portfolio.stocks.find_by_id(stock.id)
      render json: { error: "You've already added this stock" }
    else
      new_holding.save!
      render json: stock
    end
  end
end