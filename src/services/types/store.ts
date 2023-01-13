/* cSpell:disable; */
type TuserData = {

}

export interface IauthorizationStore<TuserData> {
    isLoading: boolean;
    isAuthorizationSuccess: boolean;
    userData: TuserData;
    accessToken: null,
    error: null,
    resetStatus: null,
    tokenError: false,
}