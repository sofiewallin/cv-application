/**
 * Education interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IEducation {
    id: number,
    name: string,
    degree: string,
    institution: string,
    institution_website: string,
    start_date: string,
    end_date: string,
    type: string,
    order: number,
    created_at: Date,
    updated_at: Date
}
