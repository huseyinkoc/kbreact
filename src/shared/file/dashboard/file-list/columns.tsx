import { FileListDataType } from '.';
import DateCell from '../../../../ui/date-cell';
import { Box, Flex, Text } from 'rizzui';
import Favorite from '../../../../shared/file/manager/favorite';
import { createColumnHelper } from '@tanstack/react-table';
import { MoreActions } from '../../../../components/table-utils/more-actions';

const columnHelper = createColumnHelper<FileListDataType>();

export const fileListColumns = [
  columnHelper.accessor('file', {
    size: 220,
    header: 'Name',
    enableSorting: false,
    cell: ({ row: { original } }) => (
      <Flex align="center" className="ps-2">
        <Flex
          align="center"
          justify="center"
          className="size-12 gap-0 rounded-xl bg-gray-100"
        >
          <img
            src={original.file.avatar}
            className="aspect-square w-7 h-7 object-cover"
            alt="File Type"
            loading="lazy"
          />

        </Flex>
        <Box className="ml-3 rtl:ml-0 rtl:mr-3">
          <Text className="mb-0.5 font-lexend !text-sm font-medium text-gray-900 dark:text-gray-700">
            {original.file.name}
          </Text>
        </Box>
      </Flex>
    ),
  }),
  columnHelper.accessor('size', {
    size: 130,
    header: 'Size',
    enableSorting: false,
    cell: (info) => <Text className="text-gray-500">{info.getValue()}</Text>,
  }),
  columnHelper.accessor('type', {
    size: 130,
    header: 'Type',
    enableSorting: false,
    cell: (info) => (
      <Text className="capitalize text-gray-500">{info.getValue()}</Text>
    ),
  }),
  columnHelper.accessor('modified', {
    size: 150,
    header: 'Modified',
    cell: (info) => <DateCell date={new Date(info.getValue())} />,
  }),
  columnHelper.accessor('shared', {
    size: 150,
    header: 'Shared',
    enableSorting: false,
    cell: (info) => (
      <Flex align="center" className="gap-0">
        {info.getValue().map((img: any, index: number) => {
          return (
            <img
              key={`fileavatar-${index}`}
              src={img}
              width={30}
              height={30}
              className="-me-2 aspect-square w-[30px] h-[30px] rounded-full border-2 border-gray-0 dark:border-gray-50 object-cover"
              alt="File Avatar"
              loading="lazy"
            />

          );
        })}
      </Flex>
    ),
  }),
  columnHelper.accessor('id', {
    header: '',
    size: 100,
    enableSorting: false,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3">
        <Favorite />
        <MoreActions onDelete={() => meta?.handleDeleteRow?.(row.original)} />
      </Flex>
    ),
  }),
];
