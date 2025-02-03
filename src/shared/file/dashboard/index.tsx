import StorageReport from './storage-report';
import FileStats from './file-stats';
import StorageSummary from './storage-summary';
import RecentFiles from './recent-files';
import QuickAccess from './quick-access';
import ActivityReport from './activity-report';
import Members from './members';
import FileListTable from './file-list';
import UpgradeStorage from './upgrade-storage';
import RecentActivities from './recent-activities';

export default function FileDashboard() {
  return (
    <div className="@container">
      <FileStats className="mb-5 2xl:mb-8" />
      <div className="mb-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 2xl:mb-8 2xl:gap-8">
        <StorageReport className="@container @4xl:col-span-8 @[96.937rem]:col-span-9" />
        <StorageSummary className="@4xl:col-span-4 @[96.937rem]:col-span-3" />
      </div>

      <div className="grid grid-cols-1 gap-6 @container lg:grid-cols-12 2xl:gap-8">
        <div className="col-span-full flex flex-col gap-6 @5xl:col-span-8 2xl:gap-8 3xl:col-span-9">
          <QuickAccess />
          <RecentFiles />
          <ActivityReport />
          <FileListTable />
        </div>

        <div className="col-span-full flex flex-col gap-6 @5xl:col-span-4 2xl:gap-8 3xl:col-span-3">
          <RecentActivities />
          <Members />
          <UpgradeStorage />
        </div>
      </div>
    </div>
  );
}
