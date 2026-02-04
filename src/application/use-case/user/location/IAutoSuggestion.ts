export interface IAutoSuggestion {
  execute(query: string): Promise<any>;
}
