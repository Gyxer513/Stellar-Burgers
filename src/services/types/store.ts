/* cSpell:disable; */
type TuserData = {

}

export interface IauthorizationStore {
    isLoading: boolean;
    isAuthorizationSuccess: boolean;
    userData: object | null;
    accessToken: string | null,
    error: string | null,
    resetStatus: boolean | null,
    tokenError: boolean,
}