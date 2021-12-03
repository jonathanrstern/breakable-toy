class Api::V1::UsersController < ApplicationController

  def index
    portfolio_ids = []

    if current_user
      portfolios = current_user.portfolios
      portfolios.each do |portfolio|
        portfolio_ids << portfolio.id
      end
    end

    render json: { signed_in: current_user, ids: portfolio_ids }
  end

  def show
    portfolios = User.find(params["id"]).portfolios
    counts = []

    portfolios.each do |portfolio|
      counts << portfolio.stocks.count
    end

    render json: { portfolios: portfolios, counts: counts }
  end

end
