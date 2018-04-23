class CreateCallbks < ActiveRecord::Migration[5.1]
  def change
    create_table :callbks do |t|
      t.string :ref
      t.json :contents

      t.timestamps
    end
  end
end
