interface Color {
  red: number;
  green: number;
  blue: number;
}

interface Tag {
  id: string;
  title: string;
  color: Color;
}

interface Progress {
  current: number;
  maximum: number;
}

interface Doc {
  id: string;
  title: string;
  description: string;
  created_at: number;
  updated_at: number;
  progress: Progress;
  tags: Tag[];
}

interface Column {
  id: string;
  title: string;
  color: string;
}

interface Dir {
  id: string;
  title: string;
  is_open: boolean;
  columns: Column[];
  childrens: Item[];
}

type Item = Dir | Doc;
