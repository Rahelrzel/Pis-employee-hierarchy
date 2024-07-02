export interface Node {
  id: number;
  name: string;
  role: string;
  children?: Node[];
}
