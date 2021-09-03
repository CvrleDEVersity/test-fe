export type User<T, K> = {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  website: string;
  company: K;
  post: T[];
};
