export interface postType {
  _id: string;
  userId: string;
  url: string;
  title: string;
  postUrl: string;
}

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
