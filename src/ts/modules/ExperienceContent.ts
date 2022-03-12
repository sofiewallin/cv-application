import App from "../App";
import Module from "./Module";
import WorkExperience from "../models/WorkExperience";
import IWorkExperience from "../interfaces/IWorkExperience";
import Education from "../models/Education";
import IEducation from "../interfaces/IEducation";
import IModule from "../interfaces/IModule";
import IError from "../interfaces/IError";

/**
 * Experience content module.
 * 
 * @author: Sofie Wallin
 */
export default class ExperienceContent extends Module implements IModule {
    private workExperiences: IWorkExperience[] = [];
    private education: IEducation[] = [];

    /**
     * Get all work experiences from API.
     */
    async getWorkExperiences(): Promise<IWorkExperience[]> {
        // Get all work experiences in model
        const workExperienceModel = new WorkExperience();
        let workExperiences = await workExperienceModel.readAll();

        // Write error if there is one
        if (!Array.isArray(workExperiences)) {
            const app = new App();
            await app.writeMessage('error', (workExperiences as IError).error);  
            return;
        }

        return (workExperiences as IWorkExperience[]);
    }

    /**
     * Get all education from API.
     */
    async getEducation(): Promise<IEducation[]> {
        // Get all education in model
        const educationModel = new Education();
        let education = await educationModel.readAll();

        // Write error if there is one
        if (!Array.isArray(education)) {
            const app = new App();
            await app.writeMessage('error', (education as IError).error);  
            return;
        }

        return (education as IEducation[]);
    }

    async create(): Promise<HTMLElement> {
        // Create experience container and set as module
        const experiencesDiv = await this.createDiv(['experiences-container']);
        this.module = experiencesDiv;

        // Get all work experiences
        this.workExperiences = await this.getWorkExperiences();

        // Create work experiences list and add to experiences container
        const workExperiences = await this.createList('Work experience');
        if (workExperiences) {
            // Create work column and add to module
            const columnDiv = await this.createDiv(['column']);
            this.module.append(columnDiv);

            // Create heading and add to work experiences column
            const heading = await this.createHeading(3, 'Work');
            columnDiv.append(heading);

            // Add list of work experiences to column
            columnDiv.append(workExperiences);
        }

        // // Get all education
        this.education = await this.getEducation();

        // Create work experiences list and add to experiences container
        const education = await this.createList('Education');
        if (education) {
            // Create work column and add to module
            const columnDiv = await this.createDiv(['column']);
            this.module.append(columnDiv);

            // Create heading and add to work experiences column
            const heading = await this.createHeading(3, 'Education');
            columnDiv.append(heading);

            // Add list of work experiences to column
            columnDiv.append(education);
        }

        return this.module;
    }

    /**
     * Create list.
     * 
     * Creates a list based on  object type.
     */
    async createList(objectType: string): Promise<HTMLUListElement> {
        let listItems: HTMLLIElement[] = [];
        let listClass: string;

        if (objectType === 'Work experience') {
            listClass = 'work-experience-list';
            this.workExperiences.sort((a, b) => a.order - b.order);

            const result = this.workExperiences.map(async workExperience => {
                // Create list item
                const listItem = await this.createListItem(`work-experience-${workExperience.id}`);
    
                // Create article and add to list item
                const article = await this.createArticle();
                listItem.append(article);

                // Create date span and add to article
                const dateSpan = await this.createDateSpan(workExperience);
                article.append(dateSpan);
                
                // Create a heading with or without workplace and workplace website and add to article
                let headingInnerHTML: string;
                if (workExperience.workplace) {
                    if (workExperience.workplace_website) {
                        headingInnerHTML = `${workExperience.role} at <a href="${workExperience.workplace_website}">${workExperience.workplace}</a>`;
                    } else {
                        headingInnerHTML = `${workExperience.role} at ${workExperience.workplace}`;
                    }
                } else {
                    headingInnerHTML = workExperience.role;
                }
                const heading = await this.createHeading(4, headingInnerHTML);
                article.append(heading);
    
                // Add list item to list
                listItems.push(listItem);
            });
            await Promise.all(result);

        } else {
            listClass = 'education-list';
            this.education.sort((a, b) => a.order - b.order);

            // Create a nested list for courses if there are any
            let coursesListItem: HTMLLIElement = null;
            let coursesNestedList: HTMLUListElement;
            const courses = this.education.filter(education => education.type === 'Course');
            if (courses.length > 0) {
                // Create list item with heading
                coursesListItem = await this.createListItem('selected-courses');
                const coursesHeading = await this.createHeading(4, 'Selected courses');
                coursesListItem.appendChild(coursesHeading);

                // Create ul list and add to list item
                coursesNestedList = document.createElement('ul');
                coursesListItem.append(coursesNestedList);
            }

            // Map education and create list items for programs and courses
            const result = this.education.map(async education => {
                // Create list item
                const listItem = await this.createListItem(`education-${education.id}`);

                // Create article and add to list item
                const article = await this.createArticle();
                listItem.append(article);

                // Create date span and add to article
                const dateSpan = await this.createDateSpan(education);
                article.append(dateSpan);

                // Create degree heading if there is a degree and add to article
                if (education.degree) {
                    const degreeHeading = await this.createHeading(4, education.degree);
                    article.append(degreeHeading);
                }

                // Create a heading with or without institution website and add to article
                let headingInnerHTML: string;
                if (education.institution_website) {
                    headingInnerHTML = `${education.name} at <a href="${education.institution_website}">${education.institution}</a>`;
                } else {
                    headingInnerHTML = `${education.name} at ${education.institution}`;
                }
                let headingLevel: number;
                if (education.type === 'Course') {
                    headingLevel = 5;
                } else {
                    headingLevel = (education.degree) ? 5 : 4;
                }
                const heading = await this.createHeading(headingLevel, headingInnerHTML);
                article.append(heading);

                // Add list item to nested courses list if course and to top list if program
                if (education.type === 'Course') {
                    coursesNestedList.append(listItem);
                } else {
                    // Add list item to list
                    listItems.push(listItem);
                }

                // If there is a course list item add it to top list
                if (coursesListItem) listItems.push(coursesListItem);
            });
            await Promise.all(result);
            
        }

        // Create unordered list with created list items
        let list: HTMLUListElement = null;
        if (listItems.length > 0) {
            list = await this.createUlList(listItems, [listClass]);
        }
        
        return list;
    }


    async createDateSpan(object: IWorkExperience|IEducation): Promise<HTMLSpanElement> {
        // Create date span
        const dateSpan = document.createElement('span') as HTMLSpanElement;
        dateSpan.classList.add('date');

        // Construct date string and add to date span
        const startDate = await this.constructNewDateString(object.start_date);
        const endDate = await this.constructNewDateString(object.end_date);
        const dateString = `${startDate} &#8212; ${endDate}`;
        dateSpan.innerHTML = dateString;

        return dateSpan;
    }

    async constructNewDateString(dateString: string): Promise<string> {
        let newDateString: string;
        if (dateString) {
            const newDate = new Date(dateString);
            const dateMonth = newDate.toLocaleString('default', { timeZone: 'UTC', month: 'short' });
            const dateYear = newDate.getUTCFullYear();
            newDateString = `${dateMonth} ${dateYear}`;
        } else {
            newDateString = 'Present';
        }

        return newDateString;
    }
}
