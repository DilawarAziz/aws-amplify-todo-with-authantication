import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type BooksMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Books {
  readonly id: string;
  readonly name?: string;
  readonly genre?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Books, BooksMetaData>);
  static copyOf(source: Books, mutator: (draft: MutableModel<Books, BooksMetaData>) => MutableModel<Books, BooksMetaData> | void): Books;
}