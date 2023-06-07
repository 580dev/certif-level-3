export interface Category {
  id: number;
  name: string;
  typeCategory?: TypeCategory;
  isSubCategory? : boolean
}

export interface ApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

export interface Results {
  questions: Question[];
  answers: string[];
  score: number;
}

export type Difficulty = "Easy" | "Medium" | "Hard";
export type TypeCategory = "Entertainment" | "Science";

export enum CategoriesName {
  ENTERTAINMENT = "Entertainment",
  SCIENCE = "Science"
}

export const entertainmentCategory: Category = {
  id: -1,
  name: CategoriesName.ENTERTAINMENT
};

export const scienceCategory: Category = {
  id: -2,
  name: CategoriesName.SCIENCE
};

