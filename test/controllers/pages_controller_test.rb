require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get invoice_callback" do
    get :invoice_callback
    assert_response :success
  end

end
