import Model from "./Model";
import IModel from "../interfaces/IModel";
import IWorkExperience from "../interfaces/IWorkExperience";
import IError from "../interfaces/IError";

export default class WorkExperience extends Model implements IModel {
    /**
     * Read all work experiences from API.
     */
    async readAll(): Promise<IWorkExperience[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/work-experiences`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        
            const workExperiences = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching work experiences. Try again by reloading page.');
            }
 
            return workExperiences;

        } catch (error) {
            return { error: error.message };
        }
    }
}
