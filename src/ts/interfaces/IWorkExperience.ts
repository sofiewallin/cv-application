/**
 * Work experience interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IWorkExperience {
    id: number,
    role: string,
    workplace: string,
    workplace_website: string,
    start_date: string,
    end_date: string,
    order: number,
    created_at: Date,
    updated_at: Date
}
