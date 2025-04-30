import { Action } from './action';

export class NullAction extends Action{

    constructor() {
        super();
    }

    execute(): void {

    }
}