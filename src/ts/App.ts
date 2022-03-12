import IModule from "./interfaces/IModule";
import ProjectsContent from "./modules/ProjectsContent";
import SkillsContent from "./modules/SkillsContent";
import ExperienceContent from "./modules/ExperienceContent";

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

        this.setMenuToggle();
    }

    /**
     * Render application.
     */
    async render(): Promise<void> {
        // Add projects content module in matching content container
        await this.appendModule(new ProjectsContent(), this.projectsContent);

        // Add skills content module in matching content container
        await this.appendModule(new SkillsContent(), this.skillsContent);

        // Add experience content module in matching content container
        await this.appendModule(new ExperienceContent(), this.experienceContent);
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

    /**
     * Set toggle function on menu toggle button.
     * 
     * Sets a toggle function on the toggle button
     * so that it can show and hide the menu.
     */
    async setMenuToggle(): Promise<void> {
        // Get button and menu
        const toggleMenuButton = document.querySelector('.toggle-menu-button');
        const mainMenu = document.querySelector('#main-menu');
        
        // Add event listener
        toggleMenuButton.addEventListener('click', e => {
            mainMenu.classList.toggle('hidden');
            toggleMenuButton.classList.toggle('hide');
        
            // Toggle ARIA expanded attribute
            if (toggleMenuButton.getAttribute('aria-expanded') === 'false') {
                toggleMenuButton.setAttribute('aria-expanded', 'true');
            } else {
                toggleMenuButton.setAttribute( 'aria-expanded', 'false');
            }
        
            // Toggle button text
            let hiddenTextElement = toggleMenuButton.querySelector('.hidden-visually') as HTMLElement;
            if (hiddenTextElement.innerText === 'Show menu') {
                hiddenTextElement.innerText = 'Hide menu';
            } else {
                hiddenTextElement.innerText = 'Show menu';
            }
        });
    }
}
