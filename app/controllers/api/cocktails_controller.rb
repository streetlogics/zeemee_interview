class Api::CocktailsController < ApplicationController
  def search
    index = params.fetch(:index, 0).to_i
    limit = params.fetch(:limit, 10).to_i
    query = params[:query].to_s

    cocktails = if query.present?
                  Cocktail.where('name LIKE ?', "%#{query}%")
                else
                  Cocktail.all
                end

    total_count = cocktails.count
    cocktails = cocktails.offset(index).limit(limit)

    render json: {
      drinks: cocktails.map do |cocktail|
        {
          id: cocktail.id,
          name: cocktail.name,
          category: cocktail.category,
          image: cocktail.image
        }
      end,
      totalCount: total_count
    }
  end

  def detail
    cocktail = Cocktail.includes(:ingredients).find(params[:id])
    render json: {
      "drinks": [{
        id: cocktail.id,
        name: cocktail.name,
        category: cocktail.category,
        container: cocktail.container,
        instructions: cocktail.instructions,
        image: cocktail.image,
        ingredients: cocktail.cocktail_ingredients.map do |ci|
          {
            name: ci.ingredient.name,
            measurement: ci.measurement
          }
        end
      }]
    }
  end
end 