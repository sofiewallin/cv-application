import Model from "./Model";
import IModel from "../interfaces/IModel";
import IProject from "../interfaces/IProject";
import IError from "../interfaces/IError";

export default class Project extends Model implements IModel {
    /**
     * Read all projects from API.
     */
    async readAll(): Promise<IProject[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        
            const projects = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching projects. Try again by reloading page.');
            }
 
            return projects;

        } catch (error) {
            return { error: error.message };
        }
    }
}
