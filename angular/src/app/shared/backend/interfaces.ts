// General interfaces
export interface Author {
  readonly id: number;
  readonly first_name?: string;
  readonly last_name?: string;
}

export interface User {
  readonly pk?: number;
  username: string;
  first_name?: string;
  last_name?: string;
  readonly email?: string;
}

export interface UserPassword {
  new_password1: string;
  new_password2: string;
  old_password: string;
}

export interface ObjectList<T> {
  readonly count: number;
  readonly next?: string;
  readonly previous?: string;
  readonly results: T[];
}

// Category interface
export interface Category {
  readonly id?: number;
  readonly created?: string;
  readonly modified?: string;
  readonly author?: Author;
  title: string;
  slug: string;
  description?: string;
}

// Article interfaces
export interface Article {
  title: string;
  slug: string;
  category: Category;
  description?: string;
  created?: string;
  modified?: string;
}

export interface ArticleExtended {
  id?: number;
  title: string;
  slug: string;
  content: string;
  content_html?: string;
  description?: string;
  status: number;
  tags?: any;
  category: any; // It could be an integer or a Category Object
  readonly total_downvotes?: number;
  readonly total_upvotes?: number;
  readonly total_votes?: number;
  readonly author?: Author;
  readonly created?: string;
  readonly modified?: string;
  readonly visits?: number;
}
