import {createSlice} from '@reduxjs/toolkit';

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
};

type Conversation = Array<Message>;

const initialState: Conversation = [
  {
    id: '1',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: '100k en cdi + des parts ça passe plutôt bien',
    timestamp: '2024-12-25T19:11:00Z',
  },
  {
    id: '2',
    senderId: '1',
    content: 'Quand tu vois les personnages en face...',
    timestamp: '2024-12-25T19:11:30Z',
  },
  {
    id: '3',
    senderId: '1',
    content: 'euh non lol',
    timestamp: '2024-12-25T19:11:45Z',
  },
  {
    id: '4',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content:
      'Oh ils vont se calmer sinon ils vont se faire voler leur boîte d’une manière ou d’une autre si le projet marche',
    timestamp: '2024-12-25T19:12:00Z',
  },
  {
    id: '5',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: '😂',
    timestamp: '2024-12-25T19:12:10Z',
  },
  {
    id: '6',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'Tu prends l’exemple de wework',
    timestamp: '2024-12-25T19:12:15Z',
  },
  {
    id: '7',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'Il s’est fait tej le ceo',
    timestamp: '2024-12-25T19:12:30Z',
  },
  {
    id: '8',
    senderId: '1',
    content: 'A voir',
    timestamp: '2024-12-25T19:13:00Z',
  },
  {
    id: '9',
    senderId: '1',
    content:
      'mais là faut déjà qu’il arrive à changer pour le recrutement car là c’est un peu le casse pipe si tu restes solo',
    timestamp: '2024-12-25T19:13:20Z',
  },
  {
    id: '10',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'Meme à deux c’est chaud',
    timestamp: '2024-12-25T19:17:00Z',
  },
  {
    id: '11',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content:
      'Gérer les premiers client + l’infrastructure + faire de nouvelles features',
    timestamp: '2024-12-25T19:18:00Z',
  },
  {
    id: '12',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'C’est short',
    timestamp: '2024-12-25T19:18:10Z',
  },
  {
    id: '13',
    senderId: '1',
    content: 'ça dépend si y’a beaucoup de bug ou non',
    timestamp: '2024-12-25T19:18:20Z',
  },
  {
    id: '14',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'J’y crois pas trop que ça soit bug free le truc',
    timestamp: '2024-12-25T19:19:00Z',
  },
  {
    id: '15',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'Y’a tellement de services externe au final',
    timestamp: '2024-12-25T19:19:10Z',
  },
  {
    id: '16',
    senderId: '5466fc94-06fa-4f58-8e5b-f7e8154bdc3d',
    content: 'Des webhook sur chaque connecteurs',
    timestamp: '2024-12-25T19:19:20Z',
  },
  {
    id: '17',
    senderId: '1',
    content: 'Si c’est bien géré et testé y’a pas de raisons',
    timestamp: '2024-12-25T21:05:00Z',
  },
];

export interface BottomSheetState {
  conversation: Conversation;
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
});

export default conversationSlice.reducer;
