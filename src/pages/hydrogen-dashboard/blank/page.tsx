import PageHeader from '../../../shared/page-header';
import { metaObject } from '../../../config/site_config';

export const metadata = {
  ...metaObject('Blank Page'),
};

const pageHeader = {
  title: 'Blank page',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Blank',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
