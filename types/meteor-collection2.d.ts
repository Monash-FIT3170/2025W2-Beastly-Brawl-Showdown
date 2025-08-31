import SimpleSchema from 'simpl-schema';
import { Collection } from 'meteor/mongo';

declare module 'meteor/mongo' {
    interface Collection<T, U = T> {
        attachSchema(schema: SimpleSchema | any): void;
    }
}