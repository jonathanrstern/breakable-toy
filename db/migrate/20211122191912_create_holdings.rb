class CreateHoldings < ActiveRecord::Migration[6.1]
  def change
    create_table :holdings do |t|
      t.belongs_to :stock, null: false
      t.belongs_to :portfolio, null: false

      t.timestamps
    end
  end
end
