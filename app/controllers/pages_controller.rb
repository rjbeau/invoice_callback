class PagesController < ApplicationController

  def mytoken
    render json: params
  end


  def blankpage
    head 200
  end

end
