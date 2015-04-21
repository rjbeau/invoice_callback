class Callbk < ActiveRecord::Base

  def as_json(options = {})
    {
      id: self.id,
      ref: self.ref,
      contents: self.contents,
      time_ago: "#{(Time.now - self.created_at).round(0)} s"
    }
  end

end
