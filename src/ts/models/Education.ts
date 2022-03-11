import Model from "./Model";
import IModel from "../interfaces/IModel";
import IEducation from "../interfaces/IEducation";
import IError from "../interfaces/IError";

export default class Education extends Model implements IModel {
    /**
     * Read all education from API.
     */
    async readAll(): Promise<IEducation[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/education`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        
            const education = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching education. Try again by reloading page.');
            }
 
            return education;

        } catch (error) {
            return { error: error.message };
        }
    }
}
