require 'json'

class IngestCocktailData < ActiveRecord::Migration[6.1]
  def up
    file_path = Rails.root.join('db', 'migrate', 'cocktail_recipes.json')
    cocktail_data = JSON.parse(File.read(file_path))

    cocktail_data.each do |cocktail|
      c = Cocktail.create!(
        name: cocktail['name'],
        category: cocktail['category'],
        container: cocktail['container'],
        instructions: cocktail['instructions'],
        image: cocktail['image']
      )

      cocktail['ingredients'].each do |ingredient|
        ing = Ingredient.find_or_create_by!(name: ingredient['name'])
        CocktailIngredient.create!(
          cocktail: c,
          ingredient: ing,
          measurement: ingredient['measurement']
        )
      end
    end
  end

  def down
    CocktailIngredient.delete_all
    Ingredient.delete_all
    Cocktail.delete_all
  end
end 