export class Work {
  constructor(
    public id: string,
    public date: Date,
    public location: string,
    public size: Size
  ){}  
}

export class Size{
    constructor(
        public width: number = 0,
        public height: number = 0){
    }
}