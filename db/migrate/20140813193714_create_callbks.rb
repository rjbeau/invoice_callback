class CreateCallbks < ActiveRecord::Migration
  def change
    create_table :callbks do |t|
      t.string :ref
      t.json :contents

      t.timestamps
    end
  end
end
