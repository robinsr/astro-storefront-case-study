type Mode = 'dev' | 'prod';

const current = import.meta.env.MODE;

const modes: Record<Mode, boolean> = {
  dev: current === 'development',
  prod: current === 'production',
};

export function useMode(mode: Mode): boolean {
  return modes[mode];
}
