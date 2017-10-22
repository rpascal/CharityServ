import { baseInterface } from './baseModel';
export interface Category extends baseInterface{
    name: string;
    last?: boolean;
}