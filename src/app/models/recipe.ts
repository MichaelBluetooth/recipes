export class Recipe {
    _id?: string;
    name: string;
    description?: string;
    category?: string;
    ingredients: string[] | string;
    instructions: string[] | string;
    notes?: string;
    favorite?: boolean;
    source?: string;
}
