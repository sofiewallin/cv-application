import IError from "./IError";

/**
 * Model interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IModel {
    apiUrl: string;

    readAll(): Promise<Object[]|IError>

}
