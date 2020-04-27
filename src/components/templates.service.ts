import { Subject } from 'rxjs';

export type TTemplateValue = any;

const LOCAL_STORAGE_KEY = 'decider';

class TemplatesService {
    private templatesStore: Record<string, Array<TTemplateValue>>;

    currentTemplate$: Subject<Array<TTemplateValue>> = new Subject<Array<TTemplateValue>>();
    templatesUpdate$: Subject<void> = new Subject<void>();

    static readLocalStorage(): any {
        const item = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!item) return;

        return JSON.parse(item);
    }

    constructor() {
        const localStorageTemplates = TemplatesService.readLocalStorage();
        this.templatesStore = localStorageTemplates || {};
    }

    private writeLocalStorage(): void {
        const item = JSON.stringify(this.templatesStore);
        localStorage.setItem(LOCAL_STORAGE_KEY, item);
    }

    getTemplateByName(name: string): Array<TTemplateValue> {
        return this.templatesStore[name];
    }

    getAllTemplatesNames(): Array<string> {
        return Object.keys(this.templatesStore);
    }

    addTemplate(name: string, values: Array<TTemplateValue>): void {
        this.templatesStore[name] = values;
        this.writeLocalStorage();
        this.templatesUpdate$.next(void 0);
    }

    removeTemplate(name: string): void {
        if (this.templatesStore[name]) {
            delete this.templatesStore[name];
            this.writeLocalStorage();
            this.templatesUpdate$.next(void 0);
        }
    }

    selectTemplate(templateName: string): void {
        const template = this.getTemplateByName(templateName);
        this.currentTemplate$.next(template);
    }
}

export const templatesService = new TemplatesService();
