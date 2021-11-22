class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
