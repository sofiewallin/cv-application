import App from "../App";
import Module from "./Module";
import Project from "../models/Project";
import IProject from "../interfaces/IProject";
import IModule from "../interfaces/IModule";
import IError from "../interfaces/IError";

/**
 * Projects content module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectsContent extends Module implements IModule {
    private projects: IProject[] = [];

    /**
     * Get all projects from API.
     */
    async getProjects(): Promise<IProject[]> {
        // Get all projects in model
        const projectModel = new Project();
        let projects = await projectModel.readAll();

        // Write error if there is one
        if (!Array.isArray(projects)) {
            const app = new App();
            await app.writeMessage('error', (projects as IError).error);  
            return;
        }

        return projects as IProject[];
    }

    async create(): Promise<HTMLElement> {
        // Create projects container and set as module
        const projectsDiv = await this.createDiv(['projects-container']);
        this.module = projectsDiv;

        // Get all projects
        this.projects = await this.getProjects();
        
        // Create project list and add to projects container
        const projects = await this.createProjectList(projectsDiv);
        if (projects) projectsDiv.append(projects);

        return this.module;
    }

    /**
     * Create list of projects.
     */
    async createProjectList(container: HTMLDivElement): Promise<HTMLUListElement> {
        // Sort projects in order
        this.projects.sort((a, b) => a.order - b.order);

        // Create list items from filtered projects
        let listItems: HTMLLIElement[] = [];
        const result = this.projects.map(async project => {
            // Create list item
            const listItem = await this.createListItem(`project-${project.id}`, ['project']);

            // Create article and add to list item
            const article = await this.createArticle();
            listItem.append(article);

            // Create figure with image and add to article
            const baseUrl = 'http://127.0.0.1:8000';
            const figure = await this.createFigureWithImage(
                `${baseUrl}/storage/uploads/${project.logo}`, // href 
                `${project.title} logo`, // alt
                ['project-logo'] // classes
            );
            article.append(figure);

            // Create text container and add to article
            const textContainer = await this.createDiv(['text-container']);
            article.append(textContainer);
            
            // Create title heading and add to text container
            const titleHeading = await this.createHeading(3, project.title, ['heading', 'medium-heading']);
            textContainer.append(titleHeading);
            
            /* Create paragraph with project type and project description 
            if there is a description and add to text container */
            if (project.description) {
                const paragraph = await this.createParagraph(
                    `<span class="project-type">${project.type} project &#8212;</span> ${project.description}`);
                textContainer.append(paragraph);
            }

            // Create link to website if there is one and add to text container
            if (project.website) {
                const link = await this.createLink(project.website, 'View project');
                textContainer.append(link);
            }

            // Add list item to list
            listItems.push(listItem);
        });
        await Promise.all(result);

        // Create column with heading and skill list if there are list items
        let projectList: HTMLUListElement = null;
        
        if (listItems.length > 0) {
            // Create unordered list with created list items
            projectList = await this.createUlList(listItems, ['project-list']);
            container.append(projectList);
        }
        
        return projectList;
    }
}
