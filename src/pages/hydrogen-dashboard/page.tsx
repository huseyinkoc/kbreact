import FileDashboard from '../../shared/file/dashboard';
import { metaObject } from '../../config/site_config';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  //return <>Hello</>;
  return <FileDashboard />;
}
