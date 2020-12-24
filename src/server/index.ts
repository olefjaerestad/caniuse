import { authorize } from './google-analytics/auth';
import { getData } from './google-analytics/data';

export async function app() {
  await authorize();
  await getData(); // TODO: Remove this when done testing.
}
