interface Props {
  src: string;
  size: number;
}

export function Avatar({ src, size }: Props) {
  return <img src={src} className="rounded-full object-cover" style={{ width: size, height: size }} />;
}
