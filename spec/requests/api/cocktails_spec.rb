require 'rails_helper'

RSpec.describe "Cocktails API", type: :request do
  fixtures :cocktails, :ingredients, :cocktail_ingredients

  describe "GET /api/detail" do
    it "returns the cocktail details with ingredients" do
      cocktail = cocktails(:mojito)
      get "/api/detail", params: { id: cocktail.id }
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response["drinks"][0]["name"]).to eq(cocktail.name)
      expect(json_response["drinks"][0]["ingredients"].length).to eq(3)
    end

    it "returns a 404 status when cocktail is not found" do
      get "/api/detail", params: { id: 9999 }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET /api/search" do
    it "returns a list of cocktails" do
      get "/api/search", params: { query: "" }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["drinks"].length).to be > 0
    end

    it "returns a list of cocktails" do
        get "/api/search", params: { query: "mojito" }
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)["drinks"].length).to eq(1)
      end

    it "returns an empty list when no cocktails match the query" do
      get "/api/search", params: { query: "nonexistentcocktail" }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["drinks"].length).to eq(0)
    end
  end
end