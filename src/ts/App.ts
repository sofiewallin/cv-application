import IModule from "./interfaces/IModule";
import SkillsContent from "./modules/SkillsContent";

/**
 * Main application file.
 * 
 * Handles rendering of views and messages to the user.
 * 
 * @author: Sofie Wallin
 */
export default class App {
    readonly projectsContent: HTMLElement;
    readonly skillsContent: HTMLElement;
    readonly experienceContent: HTMLElement;

    constructor() {
        this.projectsContent = document.querySelector('.projects-content') as HTMLElement;
        this.skillsContent = document.querySelector('.skills-content') as HTMLElement;
        this.experienceContent = document.querySelector('.experience-content') as HTMLElement;
    }

    /**
     * Render application.
     */
    async render(): Promise<void> {
        // Add navigation module in header
        await this.appendModule(new SkillsContent(), this.skillsContent);
    }

    /**
     * Append module to container.
     */
     async appendModule(module: IModule, element: HTMLElement): Promise<void> {
        const createdModule = await module.create();
        element.append(createdModule);
    }

    /**
     * Write flash message.
     */
     async writeMessage(type: string, message: string) {
        // Get message element, activate it and write message
        const messageElement = document.querySelector('#message') as HTMLElement;
        messageElement.classList.add(type, 'is-active');
        messageElement.innerText = message;

        // Set a timer and hide message after three seconds
        let timer = null;
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
            messageElement.classList.remove(type, 'is-active');
            messageElement.innerText = '';
        }, 3000);
    }
}
