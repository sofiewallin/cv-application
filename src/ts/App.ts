import IModule from "./interfaces/IModule";

/**
 * Main application file.
 * 
 * Handles rendering of views.
 * 
 * @author: Sofie Wallin
 */
export default class App {
    readonly apiUrl: string;
    readonly projectsContent: HTMLElement;
    readonly skillsContent: HTMLElement;
    readonly experienceContent: HTMLElement;

    constructor() {
        this.apiUrl = 'http://127.0.0.1:8000/api';
        this.projectsContent = document.querySelector('.projects-content') as HTMLElement;
        this.skillsContent = document.querySelector('.skills-content') as HTMLElement;
        this.experienceContent = document.querySelector('.experience-content') as HTMLElement;
    }

    /**
     * Render application.
     */
    async render(): Promise<void> {
        // // Add navigation module in header
        // await this.appendModule(new Navigation(), this.mainHeader);
    }

    /**
     * Append module to container.
     */
     async appendModule(module: IModule, element: HTMLElement): Promise<void> {
        const createdModule = await module.create();
        element.append(createdModule);
    }
}
