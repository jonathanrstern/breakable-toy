Stock.new

response = Faraday.get "https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&active=true&sort=ticker&order=asc&limit=1000&apiKey=#{ENV['POLYGON_API_KEY']}"
sleep(5)
parsed_response = JSON.parse(response.body)

stocks = parsed_response["results"]

stocks.each do |stock|
  if stock["name"].downcase.include?('common stock')
    stock["name"].slice! 'Common Stock'
    stock["name"].slice! 'Common stock'
    stock["name"].slice! 'common stock'
  end
  if stock["name"].downcase.include?('common shares')
    stock["name"].slice! 'Common Shares'
    stock["name"].slice! 'Common shares'
    stock["name"].slice! 'common shares'
  end
  if stock["name"].downcase.include?('ordinary share')
    stock["name"].slice! 'Ordinary Shares'
    stock["name"].slice! 'Ordinary shares'
    stock["name"].slice! 'ordinary shares'
    stock["name"].slice! 'Ordinary Share'
    stock["name"].slice! 'Ordinary share'
  end
  if stock["name"].include?('Class A')
    stock["name"].slice! 'Class A'
    stock["name"].slice! 'CLASS A'
  end
  if stock["name"].include?('Class B')
    stock["name"].slice! 'Class B'
  end
  if stock["name"].include?('Class C')
    stock["name"].slice! 'Class C'
  end
  if stock["name"].include?('Class D')
    stock["name"].slice! 'Class D'
  end

  Stock.create(ticker: stock["ticker"], name: stock["name"])
end

while parsed_response["next_url"] do
  sleep(15)
  response = Faraday.get "#{parsed_response["next_url"]}&apiKey=#{ENV['POLYGON_API_KEY']}"
  parsed_response = JSON.parse(response.body)

  stocks = parsed_response["results"]
  
  if stocks
    stocks.each do |stock|
      if stock["name"].downcase.include?('common stock')
        stock["name"].slice! 'Common Stock'
        stock["name"].slice! 'Common stock'
        stock["name"].slice! 'common stock'
      end
      if stock["name"].downcase.include?('common shares')
        stock["name"].slice! 'Common Shares'
        stock["name"].slice! 'Common shares'
        stock["name"].slice! 'common shares'
      end
      if stock["name"].downcase.include?('ordinary share')
        stock["name"].slice! 'Ordinary Shares'
        stock["name"].slice! 'Ordinary shares'
        stock["name"].slice! 'ordinary shares'
        stock["name"].slice! 'Ordinary Share'
        stock["name"].slice! 'Ordinary share'
      end
      if stock["name"].include?('Class A')
        stock["name"].slice! 'Class A'
        stock["name"].slice! 'CLASS A'
      end
      if stock["name"].include?('Class B')
        stock["name"].slice! 'Class B'
      end
      if stock["name"].include?('Class C')
        stock["name"].slice! 'Class C'
      end
      if stock["name"].include?('Class D')
        stock["name"].slice! 'Class D'
      end

      Stock.create(ticker: stock["ticker"], name: stock["name"])
    end
  end
end