class CreateCocktailIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :cocktail_ingredients do |t|
      t.references :cocktail, null: false, foreign_key: true
      t.references :ingredient, null: false, foreign_key: true
      t.string :measurement

      t.timestamps
    end
  end
end