export class Publication {
    constructor(
        public _id: string,
        public text: string,
        public file: string,
        public user: string,
        public created_at: string
    ) { }
}
