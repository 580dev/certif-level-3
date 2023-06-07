import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CategoriesName, Category, Difficulty, Question} from '../data.models';
import {Observable, Subscription, combineLatest, filter, map, partition, tap, of} from 'rxjs';
import {QuizService} from '../quiz.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit, OnDestroy{

  categories!: Category[];
  mainCategoryName: string | undefined
  subCategories: Category[] | undefined;
  mainCategories!: Category[];
  categorySelected: Category | undefined;
  categoriesSubscription!: Subscription
  questionsSubscription: Subscription | undefined
  newQuestionsSubscription:  Subscription | undefined
  questions!: Question[];
  difficulty!: Difficulty
  haveChangeQuestion: boolean = true
  loading: boolean = false

  searchControl = new FormControl();

  constructor(protected quizService: QuizService, private formBuilder: FormBuilder) { 
    this.getMainCategories()
  }

  ngOnInit(): void {}

  getMainCategories() {
    this.categoriesSubscription = this.quizService.getAllCategories().subscribe({
      next : (categories: Category[]) => {
        this.categories = categories
        this.mainCategories = this.categories.filter(category => !category.isSubCategory)
      },
      error: () => console.error
    })
  }

  getSubCategories(categoryP: Category) {
    return this.categories.filter(category => category.isSubCategory && category.typeCategory === categoryP.name)
  }

  createQuiz(): void {
    if(!this.categorySelected && !this.difficulty) return
    this.loading = true
    let categoryId: number = this.categorySelected?.id!
    this.questionsSubscription = this.quizService.createQuiz(categoryId.toString() , this.difficulty!).subscribe((questions) => {
      this.questions = questions
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe()
    this.questionsSubscription?.unsubscribe()
    this.newQuestionsSubscription?.unsubscribe()
  }

  selectedCategory(value: Category) {
    if(value.id < 0) {
      this.subCategories = this.getSubCategories(value)
    } else {
      this.categorySelected = value
      this.subCategories = undefined
    }
  }

  selectedSubCategory(value: Category) {
    this.categorySelected = value
  }

  clickChangeQuestion(question: string) {
    let categoryId: number = this.categorySelected?.id!
    this.newQuestionsSubscription = this.quizService.createQuiz(categoryId.toString() , this.difficulty!, 6).subscribe({
      next: (newQuestions: Question[]) => {
        let questionDistinct = newQuestions.find(newQuestion => !this.questions.includes(newQuestion))
        let indexReplaceQuestion = this.questions.findIndex(questionItem => questionItem.question === question)
        this.questions[indexReplaceQuestion] = questionDistinct!
        this.haveChangeQuestion = false
      }
    })
  }

}
