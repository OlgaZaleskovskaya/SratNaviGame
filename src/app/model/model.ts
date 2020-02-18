export class Player {
    name: string;
    constructor(name: string){
        this.name = name;
    }
}

export class Winner {
    winner: string;
    date: string;
    id?: number;
    constructor(winner: string, date: string){
        this.winner = winner;
        this.date = date;
    }
}

export interface IGameSetting {
    field: number;
    delay: number;
    
}

export interface IGameSettings{
    easyMode: IGameSetting;
    normalMode: IGameSetting;
    hardMode: IGameSetting;
    
}

export enum Status { Free, Aсtive, Win, Lose };