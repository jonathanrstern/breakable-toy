Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "homes#index"
  get '/portfolios/new', to: "homes#index"
  get '/portfolios/:id', to: "homes#index"
  get '/stocks/:id', to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :portfolios, only: [:show, :new, :create, :update] do
        resources :holdings, only: [:create]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      post 'stocks/search', to: 'stocks#search'
      resources :stocks, only: [:index, :show]
    end
  end
end
