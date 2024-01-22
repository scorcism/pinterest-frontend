export interface postData {
  postId: string;
  url: string;
  title: string;
  desc: string;
  postUrl: string;
  tags: string[];
  createdAt: string;
  username: string;
  firstname: string;
  lastname: string;
}

export type UserMetaType = {
  firstname: string;
  lastname: string;
  pronounce: string;
  gender: string;
  about: string;
  website: string;
  username: string;
};

export type usernameType = {
  username: string | undefined;
};

export type pageType = {
  page: number;
};

export type addBookmarkType = {
  postId: string | number;
};

export interface postType {
  _id: string;
  userId: string;
  url: string;
  title: string;
  postUrl: string;
}
