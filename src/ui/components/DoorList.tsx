import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Door } from '@/models/Door';
import { ConnectionStatus } from '@/models/ConnectionStatus';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { getLocaleString } from '@/lib/dateTime';

interface DoorListProps {
  doors: Door[];
}

const columns: GridColDef<Door>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'buildingName',
    headerName: 'Building',
    flex: 1,
  },
  {
    field: 'apartmentName',
    headerName: 'Apartment',
    flex: 1,
  },
  {
    field: 'connectionType',
    headerName: 'Connection type',
    flex: 1,
  },
  {
    field: 'connectionStatus',
    headerName: 'Connection status',
    flex: 1,
    renderCell: ({ value }) => {
      const status = value === ConnectionStatus.Online ? 'success' : 'error';

      return <Typography color={`${status}.main`}>{value}</Typography>;
    },
  },
  {
    field: 'lastConnectionStatusUpdate',
    headerName: 'Last Connection Status Update',
    flex: 1,
    renderCell: ({ value }) => {
      const formattedDate = getLocaleString(value, DateTime.DATETIME_SHORT_WITH_SECONDS);

      return <Typography>{formattedDate}</Typography>;
    },
  },
];

export function DoorList({ doors }: DoorListProps) {
  const router = useRouter();

  const onDoorRowClick = useCallback(
    (gridRow: GridRowParams<Door>) => {
      router.push({
        pathname: '/doors/[doorId]',
        query: { doorId: gridRow.id },
      });
    },
    [router],
  );

  return (
    <DataGrid
      autoHeight
      hideFooter
      rows={doors}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={onDoorRowClick}
    />
  );
}
