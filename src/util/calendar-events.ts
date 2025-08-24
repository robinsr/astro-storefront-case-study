import { z } from 'zod';

export const EventSchema = z.object({
  type: z.string(),
  summary: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date(),
});

export type VEvent = z.infer<typeof EventSchema>

export const parseEvents = (events: unknown[]): VEvent[] => {
  return events.map(e => EventSchema.parse(e));
}
