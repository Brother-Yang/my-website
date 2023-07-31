import { createAsyncThunkByRequest } from '@/utils';

type ResultType = { code: number; data: string; msg: string };
type UserType = { password: string; username: string };

export const fetchLogin = createAsyncThunkByRequest<UserType, ResultType>({
  url: `login`,
  method: 'post',
});
