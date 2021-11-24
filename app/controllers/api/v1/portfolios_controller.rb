class Api::V1::PortfoliosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Portfolio.all
  end

  def show
    portfolio = Portfolio.find(params[:id])
    render json: { portfolio: portfolio, holdings: portfolio.stocks }
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