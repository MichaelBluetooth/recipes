export class Recipe {
    _id?: string;
    name: string;
    description?: string;
    category?: string;
    ingredients: string[];
    instructions: string[];
    notes?: string;
    favorite?: boolean;
}
