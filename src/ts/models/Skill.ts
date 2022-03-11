import Model from "./Model";
import IModel from "../interfaces/IModel";
import ISkill from "../interfaces/ISkill";
import IError from "../interfaces/IError";

export default class Skill extends Model implements IModel {
    /**
     * Read all skills from API.
     */
    async readAll(): Promise<ISkill[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/skills`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        
            const skills = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching skills. Try again by reloading page.');
            }
 
            return skills;

        } catch (error) {
            return { error: error.message };
        }
    }
}
