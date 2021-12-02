class Api::V1::UsersController < ApplicationController

  def index
    render json: { signed_in: current_user }
  end

end
