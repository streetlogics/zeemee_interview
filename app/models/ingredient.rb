class Ingredient < ApplicationRecord
  has_many :cocktail_ingredients
  has_many :cocktails, through: :cocktail_ingredients

  def measurement
    cocktail_ingredient = cocktail_ingredients.find_by(cocktail_id: self.cocktail_id)
    cocktail_ingredient&.measurement
  end
end 