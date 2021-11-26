export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface LocalStorageKeys {
  accessToken: string | null;
}

export interface ContatosList {
  data: { contacts: Contato[] };
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  searchName: string | null;
}

export interface Contato {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface DataSourceContato {
  key: string;
  name: string;
  phoneNumber: string;
}

export interface AudiosList {
  data: { audios: Audio[] };
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  searchName: string | null;
}

export interface Audio {
  id: string;
  title: string;
  createdAt: string;
  url: string;
}

export interface DataSourceAudio {
  key: string;
  title: string;
  createdAt: string;
  url: string;
}

export interface AgendamentosList {
  data: { schedules: Agendamento[] };
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  searchName: string | null;
}

export interface Agendamento {
  id: string;
  title: string;
  contacts: string[];
  audio: string;
  frequency: Frequency;

  // frequência diária
  deleteWeekend?: boolean;

  // frequência semanal
  weekday?: Weekday;

  // frequência mensal

  // frequência anual

  hour: string;
  pause: boolean;
}

export interface DataSourceAgendamento {
  key: string;
  title: string;
  pause: boolean;
}
