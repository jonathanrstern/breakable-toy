Stock.new

response = Faraday.get "https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&active=true&sort=ticker&order=asc&limit=1000&apiKey=#{ENV['API_KEY']}"
parsed_response = JSON.parse(response.body)

stocks = parsed_response["results"]

stocks.each do |stock|
  Stock.create(ticker: stock["ticker"], name: stock["name"])
end

while parsed_response["next_url"] do
  response = Faraday.get "#{parsed_response["next_url"]}&apiKey=#{ENV['API_KEY']}"
  parsed_response = JSON.parse(response.body)

  stocks = parsed_response["results"]
  
  if stocks
    stocks.each do |stock|
      Stock.create(ticker: stock["ticker"], name: stock["name"])
    end
  end
end