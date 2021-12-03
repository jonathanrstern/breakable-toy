Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "homes#index"
  devise_for :users

  get '/portfolios/new', to: "homes#authenticated"
  get '/portfolios/:id', to: "homes#index"
  get '/stocks/:id', to: "homes#index"
  get '/users/:id', to: "homes#index"
  get '/about', to: "homes#index"
  get '/top-investors', to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :portfolios, only: [:show, :new, :create, :update] do
        resources :holdings, only: [:create, :destroy]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      post 'stocks/search', to: 'stocks#search'
      resources :stocks, only: [:index, :show]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show]
    end
  end

end
