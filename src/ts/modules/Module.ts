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
     * Creates and returns an article element
     * with optional classes.
     */
    async createArticle(htmlClasses?: string[]): Promise<HTMLElement> {
        const article = document.createElement('article') as HTMLElement;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                article.classList.add(htmlClass);
            });
        }

        return article;
    }

    /**
     * Create div.
     * 
     * Creates and returns a div element
     * with optional classes.
     */
    async createDiv(htmlClasses?: string[]): Promise<HTMLDivElement> {
        const div = document.createElement('div') as HTMLDivElement;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                div.classList.add(htmlClass);
            });
        }

        return div;
    }

    /**
     * Create heading.
     * 
     * Creates and returns a heading element
     * with specified level of heading, inner HTML
     * and optional classes.
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
     * Creates and returns a paragraph element
     * with inner HTML and optional classes.
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
     * Create anchor link.
     * 
     * Creates and returns a anchor element
     * with a href value, inner HTML and 
     * optional classes.
     */
    async createLink(href: string, innerHTML: string, htmlClasses?: string[]): Promise<HTMLAnchorElement> {
        const link = document.createElement('a') as HTMLAnchorElement;
        link.href = href;
        link.innerHTML = innerHTML;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                link.classList.add(htmlClass);
            });
        }

        return link;
    }

    /**
     * Create unordered list.
     * 
     * Creates and returns a ul element
     * with list items and optional classes.
     */
    async createUlList(listItems: HTMLLIElement[], htmlClasses?: string[]): Promise<HTMLUListElement> {
        const ul = document.createElement('ul') as HTMLUListElement;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                ul.classList.add(htmlClass);
            });
        }
        listItems.forEach(listItem => {
            ul.append(listItem);
        });

        return ul;
    }

    /**
     * Create list item.
     * 
     * Creates and returns a li element
     * with optional id.
     */
     async createListItem(id?: string, htmlClasses?: string[]): Promise<HTMLLIElement> {
        const li = document.createElement('li') as HTMLLIElement;
        if (id) li.id = id;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                li.classList.add(htmlClass);
            });
        }

        return li;
    }

    /**
     * Create figure with image.
     * 
     * Creates and returns a figure element
     * with optional classes and a image.
     */
     async createFigureWithImage(imgSrc: string, imgAlt: string, htmlClasses?: string[]): Promise<HTMLElement> {
        const figure = document.createElement('figure') as HTMLElement;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                figure.classList.add(htmlClass);
            });
        }
        const image = document.createElement('img') as HTMLImageElement;
        image.src = imgSrc;
        image.alt = imgAlt;
        figure.append(image);

        return figure;
    }
}
