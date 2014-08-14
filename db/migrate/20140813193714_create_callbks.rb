class CreateCallbks < ActiveRecord::Migration
  def change
    create_table :callbks do |t|
      t.string :ref
      t.hstore :contents

      t.timestamps
    end
  end
end
