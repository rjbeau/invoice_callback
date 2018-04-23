class CallbksController < ApplicationController
  skip_before_action  :verify_authenticity_token, only: :post_callback

  def index
    @callbacks = Callbk.where(ref: params[:reference]).order(created_at: :desc).limit(25)
    respond_to do |format|
      format.html
      format.json { render json: @callbacks }
    end
  end

  def show
    @callback = Callbk.find(params[:id])
    head 404 and return unless @callback.ref == params[:reference]
  end

  def post_callback
    render json: params and return
    puts get_ref.to_s.green
    unless get_ref.blank?
      Callbk.create!(ref: get_ref, contents: cleaned_params)
    end
    head 204
  end

  def redirect
    redirect_to callbks_path(reference: params[:reference])
  end

  private

  def get_ref
    params[:payload][:user_defined_8].present? ? params[:payload][:user_defined_8] : params[:reference]
  end

  def cleaned_params
    @params = params.except!(:action, :controller, :callbk)
  end

end
