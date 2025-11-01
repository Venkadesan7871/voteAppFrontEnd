
export interface User {
  id: string;
  username: string;
  passwordHash: string; // In a real app, never store plain text passwords
}

export interface VoteOption {
  id: string;
  text: string;
  count: number;
}

export interface Vote {
  id:string;
  name: string;
  creatorId: string;
  visibility: 'public' | 'private';
  password?: string;
  options: VoteOption[];
  status: 'live' | 'completed';
  voters: string[]; // List of user IDs who have voted
}

export enum DashboardView {
  CREATE_VOTE = 'CREATE_VOTE',
  ALL_VOTES = 'ALL_VOTES',
  MY_VOTES = 'MY_VOTES',
}
