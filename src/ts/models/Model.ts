/**
 * Model base.
 * 
 * @author: Sofie Wallin
 */
export default class Model {
    public apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }
}
