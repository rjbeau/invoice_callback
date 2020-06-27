class CallbksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :post_callback

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
    # render json: cleaned_params and return ## for dev testing
    Callbk.create!(ref: get_ref, contents: cleaned_params) unless get_ref.blank?
    head 204
  rescue StandardError
    head 422
  end

  def redirect
    redirect_to callbks_path(reference: params[:reference])
  end

  private

  def get_ref
    return params[:reference] if params[:reference].present?
    return 'wyre' if params[:trigger]&.include?('paymentmethod')
    return params[:payload][:user_defined_8] if params[:payload][:user_defined_8]&.present?

    raise StandardError, 'Invalid params'
  end

  def cleaned_params
    @params = params.except(:action, :controller, :callbk)
  end
end
