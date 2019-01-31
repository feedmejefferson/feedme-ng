export interface ChoiceService {

  getChoiceRoute(step: number, branch: number): Promise<Array<string>> ;
}
