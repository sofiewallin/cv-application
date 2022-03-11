/**
 * Module base.
 * 
 * @author: Sofie Wallin
 */
export default class Module {
     public module: HTMLElement;

    /**
     * Create article.
     * 
     * Creates and returns an article element.
     */
    async createArticle(htmlClasses: string[]): Promise<HTMLElement> {
        const article = document.createElement('article') as HTMLElement;
        htmlClasses.forEach(htmlClass => {
            article.classList.add(htmlClass);
        });

        return article;
    }

    /**
     * Create div.
     * 
     * Creates and returns a div element.
     */
    async createDiv(htmlClasses?: string[]): Promise<HTMLDivElement> {
        const div = document.createElement('div') as HTMLDivElement;
        if (htmlClasses.length > 0) {
            htmlClasses.forEach(htmlClass => {
                div.classList.add(htmlClass);
            });
        }

        return div;
    }

    /**
     * Create heading.
     * 
     * Creates and returns a heading element.
     */
    async createHeading(hLevel: number, innerHTML: string, htmlClasses?: string[]): Promise<HTMLHeadingElement> {
        const heading = document.createElement(`h${hLevel}`) as HTMLHeadingElement;
        heading.innerHTML = innerHTML;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                heading.classList.add(htmlClass);
            });
        }

        return heading;
    }

    /**
     * Create paragraph.
     * 
     * Creates and returns a paragraph element.
     */
    async createParagraph(innerHTML: string, htmlClasses?: string[]): Promise<HTMLParagraphElement> {
        const paragraph = document.createElement('p') as HTMLParagraphElement;
        paragraph.innerHTML = innerHTML;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                paragraph.classList.add(htmlClass);
            });
        }

        return paragraph;
    }

    /**
     * Create unordered list.
     * 
     * Creates and returns a ul element.
     */
    async createUlList(listItems: HTMLLIElement[], id?: string): Promise<HTMLUListElement> {
        const ul = document.createElement('ul') as HTMLUListElement;
        if (id) ul.id = id;
        listItems.forEach(listItem => {
            ul.append(listItem);
        });

        return ul;
    }

    /**
     * Create unordered list.
     * 
     * Creates and returns a ul element.
     */
     async createListITem(id?: string): Promise<HTMLLIElement> {
        const li = document.createElement('li') as HTMLLIElement;
        if (id) li.id = id;

        return li;
    }

    /**
     * Create form.
     * 
     * Creates and returns a form element.
     */
     async createForm(htmlClasses?: string[], id?: string): Promise<HTMLFormElement> {
        const form = document.createElement('form') as HTMLFormElement;
        form.action = '/';
        if (id) form.id = id;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                form.classList.add(htmlClass);
            });
        }
        form.noValidate = true;

        return form;
    }

    /**
     * Create button.
     * 
     * Creates and returns a button element.
     */
    async createButton(innerHTML: string, isSubmit: boolean, htmlClasses?: string[]): Promise<HTMLButtonElement> {
        const button = document.createElement('button') as HTMLButtonElement;
        button.innerHTML = innerHTML;
        if (isSubmit) button.type = 'submit';
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                button.classList.add(htmlClass);
            });
        }
        return button;
    }

    /**
     * Set toggle function on element.
     * 
     * Sets a toggle function on a clickable element
     * that controls a specific container.
     */
    async setVisibilityToggle(
         elementToClick: HTMLButtonElement|HTMLHeadingElement, 
         elementToBeToggled: HTMLElement, 
         hiddenText: string
    ): Promise<void> {
        // Set neccesary attributes
        elementToClick.setAttribute('aria-controls', elementToBeToggled.id);
        elementToClick.setAttribute('aria-expanded', 'false');
        
        // Add event listener
        elementToClick.addEventListener('click', e => {
            elementToBeToggled.classList.toggle('hidden');
            elementToClick.classList.toggle('hide');
        
            // Toggle ARIA expanded attribute
            if (elementToClick.getAttribute('aria-expanded') === 'false') {
                elementToClick.setAttribute('aria-expanded', 'true');
            } else {
                elementToClick.setAttribute( 'aria-expanded', 'false');
            }
        
            // Toggle button text
            let hiddenTextElement = elementToClick.querySelector('.hidden-visually') as HTMLElement;
            if (hiddenTextElement.innerText === `Show ${hiddenText}`) {
                hiddenTextElement.innerText = `Hide ${hiddenText}`;
            } else {
                hiddenTextElement.innerText = `Show ${hiddenText}`;
            }
        });
    }
}
