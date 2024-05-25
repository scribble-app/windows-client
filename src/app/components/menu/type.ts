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

interface Dir {
  id: string;
  title: string;
  is_open: boolean;
  childrens: Item[];
}

type Item = Dir | Doc;
