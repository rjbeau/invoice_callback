require 'test_helper'

class CallbacksControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get post" do
    get :post
    assert_response :success
  end

end
