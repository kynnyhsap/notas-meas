export function Opaque(props: { children: any; opacity?: number }) {
  const opacity = () => props.opacity ?? 30;

  return <div class={`opacity-${opacity()}`}>{props.children}</div>;
}
