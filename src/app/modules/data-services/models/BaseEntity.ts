import {IBaseEntity} from '../../../shared/interfaces/IBaseEntity';

export class BaseEntity implements IBaseEntity {
    public id: string;

    public isEntityProcessing = false;
}