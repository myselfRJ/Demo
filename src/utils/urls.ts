export const URLS = {
  queryRecipe: (query: string) => `recipes/complexSearch?query=${query}`,
  getRecipeById: (id: string) =>
    `recipes/${id}/information?includeNutrition=false`,
};
