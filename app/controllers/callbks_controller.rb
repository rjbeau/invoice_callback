class CallbksController < ApplicationController
  skip_before_filter  :verify_authenticity_token, only: :post_callback

  def index
    @callbacks = Callbk.where(ref: params[:reference]).order(created_at: :desc)
  end

  def show
    @callback = Callbk.find(params[:id])
    head 404 and return unless @callback.ref == params[:reference]
  end

  def post_callback
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
    if params[:payload][:user_defined_8].present?
      params[:payload][:user_defined_8]
    else
      params[:reference]
    end
  end

  def cleaned_params
    @params = params.except!(:action, :controller, :callbk)
  end

end
