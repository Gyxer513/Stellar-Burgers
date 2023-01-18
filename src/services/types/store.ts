/* cSpell:disable; */

export interface IauthorizationStore {
    isLoading: boolean;
    isAuthorizationSuccess: boolean;
    userData: object | null;
    accessToken: string | null,
    error: string | null,
    resetStatus: boolean | null,
    tokenError: boolean,
}
export interface IingredientsStore {
    ingredients: [],
    chosenIngredients: [],
    chosenBun: object | null,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
}
