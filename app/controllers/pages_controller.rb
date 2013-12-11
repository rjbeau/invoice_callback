class PagesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def invoice_callback
    render text: params[:page].to_json
  end

  def mytoken
    render text: params.to_json
  end


  def blankpage
    render text: ''
  end

end
