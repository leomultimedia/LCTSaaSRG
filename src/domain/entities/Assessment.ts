export type QuestionType = 'text' | 'choice' | 'video' | 'image';

export interface LogicRule {
  targetQuestionId: string;
  condition: 'equals' | 'contains' | 'not_equals';
  value: string;
  action: 'show' | 'skip_to';
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[]; // Used for 'choice' types
  required?: boolean;
  logic?: LogicRule[];
}

export interface AssessmentSchema {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export class Assessment {
  constructor(public readonly schema: AssessmentSchema) {}

  public getQuestionCount(): number {
    return this.schema.questions.length;
  }

  public validateResponses(responses: Record<string, any>): string[] {
    const errors: string[] = [];
    this.schema.questions.forEach((q) => {
      if (q.required && !responses[q.id]) {
        errors.push(`Question "${q.label}" is required.`);
      }
    });
    return errors;
  }
}
