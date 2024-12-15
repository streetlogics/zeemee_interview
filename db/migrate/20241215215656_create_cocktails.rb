class CreateCocktails < ActiveRecord::Migration[8.0]
  def change
    create_table :cocktails do |t|
      t.string :name
      t.string :category
      t.string :container
      t.text :instructions
      t.string :image

      t.timestamps
    end
  end
end
