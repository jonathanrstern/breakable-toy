require 'faraday'
# require 'finnhub_ruby'

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
  
  def show
    ticker = params["id"].upcase
    response1 = Faraday.get "https://finnhub.io/api/v1/stock/metric?symbol=#{ticker}&token=#{ENV['FINNHUB_API_KEY']}"
    parsed_response1 = JSON.parse(response1.body)
    parsed_response1_metrics = parsed_response1["metric"]

    response2 = Faraday.get "https://finnhub.io/api/v1/stock/profile2?symbol=#{ticker}&token=#{ENV['FINNHUB_API_KEY']}"
    parsed_response2 = JSON.parse(response2.body)

    response3 = Faraday.get "https://finnhub.io/api/v1/quote?symbol=#{ticker}&token=#{ENV['FINNHUB_API_KEY']}"
    parsed_response3 = JSON.parse(response3.body)

    time_now = Time.now.to_i
    time_year_ago = time_now - 31556952

    response4 = Faraday.get "https://finnhub.io/api/v1/stock/candle?symbol=#{ticker}&resolution=D&from=#{time_year_ago}&to=#{time_now}&token=c6f9drqad3idclgq86j0"
    parsed_response4 = JSON.parse(response4.body)

    response5 = Faraday.get "https://api.polygon.io/v2/reference/news?ticker=#{ticker}&limit=5&apiKey=#{ENV['POLYGON_API_KEY']}"
    parsed_response5 = JSON.parse(response5.body)
    articles = parsed_response5["results"]

    revenue = parsed_response1_metrics["revenuePerShareAnnual"] * parsed_response2["shareOutstanding"]

    metrics = {
      annual_low: parsed_response1_metrics["52WeekLow"],
      annual_high: parsed_response1_metrics["52WeekHigh"],
      market_cap: parsed_response1_metrics["marketCapitalization"],
      beta: parsed_response1_metrics["beta"],
      pe_ratio: parsed_response1_metrics["peNormalizedAnnual"],
      eps: parsed_response1_metrics["epsNormalizedAnnual"],
      div_yield: parsed_response1_metrics["dividendYieldIndicatedAnnual"],
      profit_margin: parsed_response1_metrics["netProfitMarginAnnual"],
      revenue: revenue,
      shares: parsed_response2["shareOutstanding"],
      exchange: parsed_response2["exchange"],
      name: parsed_response2["name"],
      price: parsed_response3["c"],
      change_dollar: parsed_response3["d"],
      change_percent: parsed_response3["dp"],
      open: parsed_response3["o"],
      high: parsed_response3["h"],
      low: parsed_response3["l"],
      articles: articles,
      chart_prices: parsed_response4["c"],
      chart_times: parsed_response4["t"]
    }
    
    render json: metrics
  end

end