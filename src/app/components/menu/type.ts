interface Tag {
  id: string;
  title: string;
  color: string;
  is_belong_column: boolean;
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
  tags: Tag[];
  columns: Column[];
  childrens: Item[];
}

type Item = Dir | Doc;
