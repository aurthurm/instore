export interface BotSession {
    _id?: string;
    source: string;
    previousMenu: string;
    currentMenu: string;
    nextMenu: string;
    responses: any;
    status: string;
    menuLock: boolean; 
}