import App from "../App";
import Module from "./Module";
import Skill from "../models/Skill";
import ISkill from "../interfaces/ISkill";
import IModule from "../interfaces/IModule";
import IError from "../interfaces/IError";

/**
 * Skills content module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillsContent extends Module implements IModule {
    private skills: ISkill[] = [];

    /**
     * Get all skills from API.
     */
    async getSkills(): Promise<ISkill[]> {
        // Get all skills in model
        const skillModel = new Skill();
        let skills = await skillModel.readAll();

        // Write error if there is one
        if (!Array.isArray(skills)) {
            const app = new App();
            await app.writeMessage('error', (skills as IError).error);  
            return;
        }

        return skills as ISkill[];
    }

    async create(): Promise<HTMLElement> {
        // Create skills container and set as module
        const skillsDiv = await this.createDiv(['skills-container']);
        this.module = skillsDiv;

        // Get all skills
        this.skills = await this.getSkills();
        
        // Create professional skills list and add to skills container
        const professionalSkills = await this.createSkillList('Professional', skillsDiv);
        if (professionalSkills) skillsDiv.append(professionalSkills);

        // Create technical skills list and add to skills container
        const technicalSkills = await this.createSkillList('Technical', skillsDiv);
        if (technicalSkills) skillsDiv.append(technicalSkills);

        // Create personal skills list and add to skills container
        const personalSkills = await this.createSkillList('Personal', skillsDiv);
        if (personalSkills) skillsDiv.append(personalSkills);

        // Create lingual skills list and add to skills container
        const lingualSkills = await this.createSkillList('Lingual', skillsDiv);
        if (lingualSkills) skillsDiv.append(lingualSkills);

        return this.module;
    }

    /**
     * Create list of skills.
     * 
     * Creates a list of skills based on type.
     */
    async createSkillList(skillType: string, container: HTMLDivElement): Promise<HTMLDivElement> {
        // Filter skills and sort them in order
        const filteredSkills = this.skills.filter(skill => skill.type === skillType);
        filteredSkills.sort((a, b) => a.order - b.order);

        // Create list items from filtered skills
        let listItems: HTMLLIElement[] = [];
        const result = filteredSkills.map(async skill => {
            // Create list item
            const listItem = await this.createListItem(`skill-${skill.id}`);
            listItem.innerHTML = skill.title;

            // Add list item to list
            listItems.push(listItem);
        });
        await Promise.all(result);

        // Create column with heading and skill list if there are list items
        let columnDiv: HTMLDivElement = null;
        
        if (listItems.length > 0) {
            // Create skills column for skills and add to container
            columnDiv = await this.createDiv(['column']);
            container.append(columnDiv);

            // Create heading and add to skills column
            const heading = await this.createHeading(3, skillType);
            columnDiv.append(heading);

            // Create unordered list with created list items
            const skillList = await this.createUlList(listItems, [`${skillType.toLowerCase()}-skill-list`]);
            columnDiv.append(skillList);
        }
        
        return columnDiv;
    }
}
