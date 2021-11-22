Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "homes#index"

  namespace :api do
    namespace :v1 do
      post 'stocks/search', to: 'stocks#search'
      resources :stocks, only: [:index]
    end
  end
end
