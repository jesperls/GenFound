export interface Chapter {
  answer2Location: string;
  answer1Location: string;
  answer3Location: string;
  text: string;
  answer3: string;
  address: string;
  metadata: string;
  id: string;
  answer1: string;
  answer2: string;
}

export interface Poll {
  answer1: number;
  id: string;
  answer2: number;
}

export interface Content {
  text: string;
  address: string;
  id: string;
  answer1: string;
  answer2: string;
  answer3: string;
}

export interface Response {
  chapter?: Chapter;
  content?: Content;
  poll?: Poll;
}

export interface Data {
  statusCode: number;
  response: Response;
}