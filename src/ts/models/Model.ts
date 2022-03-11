/**
 * Model base.
 * 
 * @author: Sofie Wallin
 */
export default class Model {
    public apiUrl: string;

    constructor() {
        this.apiUrl = 'http://127.0.0.1:8000/api';
    }
}
